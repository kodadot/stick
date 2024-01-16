import { getOrFail as get } from '@kodadot1/metasquid/entity'
import { CollectionEntity, NFTEntity } from '../../model'
import { unwrap } from '../utils/extract'
import { unHex } from '../utils/helper'
import { Context } from '../utils/types'
import { getAttributeEvent } from './getters'
import { attributeFrom, tokenIdOf } from './types'

export async function handleAttributeSet(context: Context): Promise<void> {
  const event = unwrap(context, getAttributeEvent)

  const final =
    event.sn !== undefined
      ? await get(context.store, NFTEntity, tokenIdOf(event as any))
      : await get(context.store, CollectionEntity, event.collectionId)

  if (!final.attributes) {
    final.attributes = []
  }

  if (event.value === null) {
    final.attributes = final.attributes?.filter((attr) => attr.trait !== event.trait)
  } else {
    const attribute = final.attributes?.find((attr) => attr.trait === event.trait)
    if (attribute) {
      attribute.value = unHex(event.value) ?? String(event.value)
    } else {
      const newAttribute = attributeFrom({ trait_type: event.trait, value: unHex(event.value) ?? String(event.value) })
      final.attributes?.push(newAttribute)
    }
  }

  await context.store.save(final)
}
