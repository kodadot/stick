import { contentFrom, type Content } from '@kodadot1/hyperdata'
import { ensure } from '@kodadot1/metasquid'
import { EntityWithId, TokenMetadata } from '@kodadot1/metasquid/types'
import { $obtain } from '@kodadot1/minipfs'
import { MetadataEntity } from '../../model'
import logger from './logger'
// import { attributeFrom } from './types'
export const BASE_URL = 'https://image.w.kodadot.xyz/'

export const fetchMetadata = async <T extends Content>(metadata: string): Promise<T> => {
  try {
    if (!metadata) {
      return ensure<T>({})
    }
    const value = await $obtain<T>(metadata, ['rmrk', 'infura_kodadot1'], true)
    return contentFrom(value as any) as T
  } catch (e) {
    logger.error(`[MINIPFS] ${e}`)
  }

  return ensure<T>({})
}

export const fetchAllMetadata = async <T extends Content>(
  metadata: string[]
): Promise<(Partial<MetadataEntity> & EntityWithId)[]> => {
  const res = await Promise.allSettled(metadata.map((meta) => fetchMetadata<T>(meta)))
  const fulfilled = res
    .map((result, index) => ({ ...result, id: metadata[index] }))
    .filter((r) => r.status === 'fulfilled') as (PromiseFulfilledResult<T> & EntityWithId)[]
  return fulfilled.map(({ value, id }) => makeCompatibleMetadata(id, value))
}

export const makeCompatibleMetadata = (
  id: string,
  metadata: Content
): Partial<MetadataEntity> & EntityWithId => ({
  id,
  description: metadata.description || '',
  image: metadata.image || metadata.thumbnail,
  animationUrl: metadata.animationUrl,
  attributes: [], // metadata.attributes?.map(attributeFrom) || [],
  name: metadata.name,
  type: metadata.type || '',
})
