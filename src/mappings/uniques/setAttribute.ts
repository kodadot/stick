import { getOrFail as get } from '@kodadot1/metasquid/entity'
import { CollectionEntity, NFTEntity } from '../../model'
import { unwrap } from '../utils/extract'
import { Context } from '../utils/types'
import { getAttributeEvent } from './getters'
import { tokenIdOf } from './types'

export async function handleAttributeSet(context: Context): Promise<void> {
  const event = unwrap(context, getAttributeEvent);

  const final = event.sn !== undefined ? await get(context.store, NFTEntity, tokenIdOf(event as any)) : await get(context.store, CollectionEntity, event.collectionId);
  
  // final.attributes = final.attributes?.filter((attr) => attr.key !== event.key.toString());

  await context.store.save(final);
}