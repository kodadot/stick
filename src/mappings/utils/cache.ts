import logger, { logError } from './logger'
import { Store } from './types'

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

export async function updateItemMetadataByCollection(store: Store, collectionId: string): Promise<void> {
  try {
    const rows = await store.query(MetadataQuery.polyfill, [collectionId])
    logger.info(`[METADATA POLYFILL] ${rows.length} NFTs updated`)
  } catch (e) {
    logError(e, (err) => logger.error(`[METADATA POLYFILL] ${err.message}`))
  }
}
