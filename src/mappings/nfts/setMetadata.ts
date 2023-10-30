import { get, getOptional } from '@kodadot1/metasquid/entity'
import { isFetchable } from '@kodadot1/minipfs'
import { unwrap } from '../utils/extract'
import { Context, isNFT } from '../utils/types'
import { CollectionEntity, NFTEntity } from '../../model'
import { handleMetadata } from '../shared/metadata'
import { debug, warn } from '../utils/logger'
import { updateItemMetadataByCollection } from '../utils/cache'
import { setMetadataHandler } from '../shared/token'
import { tokenIdOf } from './types'
import { getMetadataEvent } from './getters'

const OPERATION = 'METADATA' as any
export async function handleMetadataSet(context: Context): Promise<void> {
  const event = unwrap(context, getMetadataEvent)
  debug(OPERATION, event)

  if (!event.metadata) {
    return
  }

  const eventIsOnNFT = isNFT(event)

  const final = eventIsOnNFT
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
    const previousNftMedia = final?.image || final?.media
    const newNftMedia = metadata?.image || metadata?.animationUrl
    final.meta = metadata
    final.name = metadata?.name
    final.image = metadata?.image
    final.media = metadata?.animationUrl

    if (eventIsOnNFT) {
      const collection = await getOptional<CollectionEntity>(context.store, CollectionEntity, event.collectionId)

      if (!collection) {
        warn(OPERATION, `collection ${event.collectionId} not found`)
        return
      }
      if (final instanceof NFTEntity && newNftMedia !== previousNftMedia) {
        await setMetadataHandler(context, collection, final)
      }
    }

    await context.store.save(final)

    if (!event.sn && final.metadata) {
      await updateItemMetadataByCollection(context.store, event.collectionId)
    }
  }
}
