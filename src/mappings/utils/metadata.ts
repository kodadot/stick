import { contentFrom, type Content } from '@kodadot1/hyperdata'
import { ensure } from '@kodadot1/metasquid'
import { EntityWithId } from '@kodadot1/metasquid/types'
import { $obtain, type URI, obtain } from '@kodadot1/minipfs'
import { MetadataEntity } from '../../model'
import logger from './logger'
// import { attributeFrom } from './types'
export const BASE_URL = 'https://image.w.kodadot.xyz/'

/**
 * Fetch the metadata from the IPFS
 * @param metadata - the metadata to fetch
 **/
export const fetchMetadata = async <T extends Content>(metadata: string): Promise<T> => {
  try {
    if (!metadata) {
      return ensure<T>({})
    }

    // e.g: https://fxart-beta.kodadot.workers.dev/metadata/v1/json?chain=ahp&collection=115&nft=2404413027&metadata=ipfs:%2F%2Fbafybeidwapzo6tll4qc2n4u7gmbjdett6fi37xis7dwzpacazxhjm6z7t4%2F0.json
    if (metadata.includes('kodadot.workers.dev/metadata/')) {
      const value = await obtain(metadata as URI, {
        retry: 6,
        retryDelay: 10_000,
      })
      return contentFrom(value as any) as T
    }

    const value = await $obtain<T>(metadata, ['rmrk', 'infura_kodadot1'], true)
    return contentFrom(value as any) as T
  } catch (e) {
    logger.error(`[MINIPFS] ${e}`)
  }

  return ensure<T>({})
}

/**
 * Fetch the list of metadata from the IPFS
 * @param metadata - the metadata to fetch
 **/
export const fetchAllMetadata = async <T extends Content>(
  metadata: string[]
): Promise<(Partial<MetadataEntity> & EntityWithId)[]> => {
  const res = await Promise.allSettled(metadata.map((meta) => fetchMetadata<T>(meta)))
  const fulfilled = res
    .map((result, index) => ({ ...result, id: metadata[index] }))
    .filter((r) => r.status === 'fulfilled') as (PromiseFulfilledResult<T> & EntityWithId)[]
  return fulfilled.map(({ value, id }) => makeCompatibleMetadata(id, value))
}

/**
 * Format the metadata to be compatible with the cache model
 * @param id - the id of the metadata (CID)
 * @param metadata - the metadata to fetch
 **/
export const makeCompatibleMetadata = (id: string, metadata: Content): Partial<MetadataEntity> & EntityWithId => ({
  id,
  description: metadata.description || '',
  image: metadata.image || metadata.thumbnail,
  animationUrl: metadata.animationUrl,
  attributes: [], // metadata.attributes?.map(attributeFrom) || [],
  name: metadata.name,
  type: metadata.type || '',
})
