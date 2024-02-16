import { type Content } from '@kodadot1/hyperdata'
import { EntityWithId, create, emOf, getOrCreate } from '@kodadot1/metasquid/entity'
import { CacheStatus, MetadataEntity } from '../../model'
import logger, { logError, pending, success } from './logger'
import { fetchAllMetadata } from './metadata'
import { Store } from './types'

const DELAY_MIN = 60 // every 60 minutes
const STATUS_ID = '0'
const METADATA_STATUS_ID = '1'
const METADATA_DELAY_MIN = 15 // every 24 hours
const TO_MINUTES = 60_000

enum MetadataQuery {
  missing = `SELECT 
    DISTINCT metadata as id
  FROM nft_entity
  WHERE metadata IS NOT NULL
    AND meta_id IS NULL
  UNION
  SELECT
    DISTINCT  metadata as id
  FROM collection_entity
  WHERE metadata IS NOT NULL
    AND meta_id IS NULL;`,

  nft = `UPDATE
    nft_entity ne
  SET 
    meta_id = me.id,
    name = me.name,
    image = me.image,
    media = me.animation_url
  FROM metadata_entity me
  WHERE ne.metadata = me.id
  RETURNING ne.id, me.id;`,

  collection = `UPDATE
    collection_entity ce
  SET
    meta_id = me.id,
    name = me.name,
    image = me.image,
    media = me.animation_url
  FROM metadata_entity me
  WHERE ce.metadata = me.id
  RETURNING ce.id, me.id;`,

  polyfill = `UPDATE
    nft_entity ne
    SET
      metadata = ce.metadata,
      meta_id = ce.meta_id,
      name    = ce.name,
      image   = ce.image,
      media   = ce.media
  FROM collection_entity ce
  WHERE ce.id = $1
    AND ne.collection_id = ce.id
    AND ne.metadata is null
    RETURNING ne.id
  `,
}

const OPERATION = 'METADATA_CACHE' as any

/**
 * update metadata for item and collection
 * @param store - subsquid store to handle the cache
 * @param collectionId - the id of the collection
**/
export async function updateItemMetadataByCollection(store: Store, collectionId: string): Promise<void> {
  try {
    const rows = await emOf(store).query(MetadataQuery.polyfill, [collectionId])
    logger.info(`[METADATA POLYFILL] ${rows.length} NFTs updated`)
  } catch (e) {
    logError(e, (err) => logger.error(`[METADATA POLYFILL] ${err.message}`))
  }
}

function getPassedMinutes(timestamp: Date, lastBlockTimestamp: Date): number {
  return (timestamp.getTime() - lastBlockTimestamp.getTime()) / TO_MINUTES
}

/**
 * Main entry point for updating the metadata cache
 * @param timestamp - the timestamp of the block
 * @param store - subsquid store to handle the cache
**/
export async function updateMetadataCache(timestamp: Date, store: Store): Promise<void> {
  const lastUpdate = await getOrCreate(store, CacheStatus, METADATA_STATUS_ID, { id: METADATA_STATUS_ID, lastBlockTimestamp: new Date(0) })
  const passedMins = getPassedMinutes(timestamp, lastUpdate.lastBlockTimestamp)
  pending(OPERATION, `${passedMins} MINS SINCE LAST UPDATE`)
  if (passedMins >= DELAY_MIN) {
    try {
      await updateMissingMetadata(store)
      lastUpdate.lastBlockTimestamp = timestamp
      await store.save(lastUpdate)
      // success('[METADATA CACHE UPDATE]');
    } catch (e) {
      logError(e, (err) => logger.error(`[METADATA CACHE UPDATE] ${err.message}`))
    }
  }
}

/**
 * Main entry point for the cache update
 * @param timestamp - the timestamp of the block
 * @param store - subsquid store to handle the cache
**/
export async function updateCache(timestamp: Date, store: Store): Promise<void> {
  // const lastUpdate = await getOrCreate(store, CacheStatus, STATUS_ID, { id: STATUS_ID, lastBlockTimestamp: new Date(0) });
  // const passedMins = (timestamp.getTime() - lastUpdate.lastBlockTimestamp.getTime()) / TO_MINUTES;
  // logger.info(`[CACHE UPDATE] PASSED TIME - ${passedMins} MINS`);
  await updateMetadataCache(timestamp, store)
}

/**
 * update image and media for item and collection
 * from the metadata table
 * @param store - subsquid store to handle the cache
**/
async function updateMissingMetadata(store: Store) {
  try {
    const missing: EntityWithId[] = await emOf(store).query(MetadataQuery.missing)
    if (missing.length === 0) {
      logger.info('[MISSING METADATA] - NONE')
      return
    }

    logger.info(`[MISSING METADATA] - ${missing.length}`)
    const ids = missing.map((el) => el.id)
    const results = await fetchAllMetadata<Content>(ids)
    const entities = results.map((el) => create(MetadataEntity, el.id, el))
    logger.debug(`[MISSING METADATA] - FOUND ${entities.length}`)
    await store.save(entities)
    await emOf(store).query(MetadataQuery.nft)
    await emOf(store).query(MetadataQuery.collection)
    
    success(OPERATION, `UPDATED ${entities.length} METADATA`)
  } catch (e) {
    logError(e, (err) => logger.error(`[MISSING METADATA] ${err.message}`))
  }
  // const nft = await emOf(store).query(MetadataQuery.nft);
  // const collection = await emOf(store).query(MetadataQuery.collection);
  // logger.info(`[CACHE UPDATE] MISSING METADATA - ${missing.length} NFTs, ${nft.length} NFTs, ${collection.length} Collections`);
}