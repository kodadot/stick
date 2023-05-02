import { getOrFail as get } from '@kodadot1/metasquid/entity'
import { unwrap } from '../utils/extract'
import { Context } from '../utils/types'
import { getMetadataEvent } from './getters'
import { CollectionEntity, NFTEntity } from '../../model'
import { tokenIdOf } from './types'
import { handleMetadata } from '../shared/metadata'

export async function handleAttributeSet(context: Context): Promise<void> {
  const event = unwrap(context, getMetadataEvent);

  if (!event.metadata) {
    return;
  }

  const final = event.sn !== undefined ? await get(context.store, NFTEntity, tokenIdOf(event as any)) : await get(context.store, CollectionEntity, event.collectionId);
  
  final.metadata = event.metadata;

  if (final.metadata) {
    const metadata = await handleMetadata(final.metadata, context.store);
    final.meta = metadata;
    final.name = metadata?.name;
    final.image = metadata?.image;
    final.media = metadata?.animationUrl;
  }

  await context.store.save(final);
}