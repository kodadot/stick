import { get } from '@kodadot1/metasquid/entity'
import { isFetchable } from '@kodadot1/minipfs'
import { unwrap } from '../utils/extract'
import { Context } from '../utils/types'
import { CollectionEntity, NFTEntity } from '../../model'
import { handleMetadata } from '../shared/metadata'
import { debug, warn } from '../utils/logger'
import { updateItemMetadataByCollection } from '../utils/cache'
import { tokenIdOf } from './types'
import { getMetadataEvent } from './getters'

export async function handleMetadataSet(context: Context): Promise<void> {
  const event = unwrap(context, getMetadataEvent)
  debug('METADATA' as any, event)

  if (!event.metadata) {
    return
  }

  const final =
    event.sn !== undefined
      ? await get(context.store, NFTEntity, tokenIdOf(event as any))
      : await get(context.store, CollectionEntity, event.collectionId)

  if (!final) {
    warn('METADATA' as any, `MISSING ${event.collectionId}-${event.sn}`)
    return
  }

  if (!isFetchable(event.metadata)) {
    warn('METADATA' as any, `NOT FETCHABLE ${event.collectionId}-${event.sn} ${event.metadata}`)
    return
  }

  final.metadata = event.metadata

  if (final.metadata) {
    const metadata = await handleMetadata(final.metadata, context.store)
    final.meta = metadata
    final.name = metadata?.name
    final.image = metadata?.image
    final.media = metadata?.animationUrl
  }

  await context.store.save(final)

  if (!event.sn && final.metadata) {
    await updateItemMetadataByCollection(context.store, event.collectionId)
  }
}
