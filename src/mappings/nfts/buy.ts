import { getOrFail } from '@kodadot1/metasquid/entity'
import { CollectionEntity as CE, NFTEntity as NE } from '../../model'
import { createEvent } from '../shared/event'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Action, Context, createTokenId } from '../utils/types'
import { calculateCollectionOwnerCountAndDistribution } from '../utils/helper'
import { getBuyTokenEvent } from './getters'

const OPERATION = Action.BUY

export async function handleTokenBuy(context: Context): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getBuyTokenEvent)
  debug(OPERATION, event, true)

  const id = createTokenId(event.collectionId, event.sn)
  const entity = await getOrFail<NE>(context.store, NE, id)
  const collection = await getOrFail<CE>(context.store, CE, event.collectionId)
  debug(OPERATION, entity, true)

  const originalPrice = event.price
  const originalOwner = entity.currentOwner ?? undefined

  entity.price = BigInt(0)
  entity.currentOwner = event.caller
  entity.updatedAt = event.timestamp
  
  if (originalPrice) {
    collection.volume += originalPrice
    if (originalPrice > collection.highestSale) {
      collection.highestSale = originalPrice
    }
  }
  const { ownerCount, distribution } = await calculateCollectionOwnerCountAndDistribution(
    context.store,
    collection.id,
    entity.currentOwner,
    originalOwner
  )
  collection.ownerCount = ownerCount
  collection.distribution = distribution

  success(OPERATION, `${id} by ${event.caller} for ${String(event.price)}`)
  await context.store.save(entity)
  await context.store.save(collection)
  const meta = String(event.price || '')
  await createEvent(entity, OPERATION, event, meta, context.store, event.currentOwner)
}
