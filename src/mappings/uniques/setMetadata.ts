import { get, getOptional } from '@kodadot1/metasquid/entity'
import { isFetchable } from '@kodadot1/minipfs'
import { unwrap } from '../utils/extract'
import { Context } from '../utils/types'
import { CollectionEntity, NFTEntity } from '../../model'
import { handleMetadata } from '../shared/metadata'
import { debug, warn } from '../utils/logger'
import { updateItemMetadataByCollection } from '../utils/cache'
import { handleTokenEntity } from '../shared/handleTokenEntity'
import { tokenIdOf } from './types'
import { getMetadataEvent } from './getters'

const OPERATION = 'METADATA' as any

export async function handleMetadataSet(context: Context): Promise<void> {
  const event = unwrap(context, getMetadataEvent)
  debug(OPERATION, event)

  if (!event.metadata) {
    return
  }

  const isNFT = event.sn !== undefined

  const final = isNFT
    ? await get(context.store, NFTEntity, tokenIdOf(event as any))
    : await get(context.store, CollectionEntity, event.collectionId)

  if (!final) {
    warn(OPERATION, `MISSING ${event.collectionId}-${event.sn}`)
    return
  }

  if (!isFetchable(event.metadata)) {
    warn(OPERATION, `NOT FETCHABLE ${event.collectionId}-${event.sn} ${event.metadata}`)
    return
  }

  final.metadata = event.metadata

  if (final.metadata) {
    const metadata = await handleMetadata(final.metadata, context.store)
    final.meta = metadata
    final.name = metadata?.name
    final.image = metadata?.image
    final.media = metadata?.animationUrl

    if (isNFT) {
      const collection = await getOptional<CollectionEntity>(context.store, CollectionEntity, event.collectionId)

      if (!collection) {
        warn(OPERATION, `collection ${event.collectionId} not found`)
        return
      }
      const nft = final as NFTEntity
      const token = await handleTokenEntity(context, collection, nft) // handling tokenEntity
      if (token) {
        nft.token = token
      }
    }
  }

  await context.store.save(final)

  if (!event.sn && final.metadata) {
    await updateItemMetadataByCollection(context.store, event.collectionId)
  }
}
