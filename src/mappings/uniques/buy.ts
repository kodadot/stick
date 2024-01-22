import { getWith } from '@kodadot1/metasquid/entity'
import { NFTEntity as NE } from '../../model'
import { createEvent } from '../shared/event'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Action, Context, createTokenId } from '../utils/types'
import { calculateCollectionFloor, calculateCollectionOwnerCountAndDistribution } from '../utils/helper'
import { getBuyTokenEvent } from './getters'

const OPERATION = Action.BUY

export async function handleTokenBuy(context: Context): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getBuyTokenEvent)
  debug(OPERATION, event, true)

  const id = createTokenId(event.collectionId, event.sn)
  const entity = await getWith(context.store, NE, id, { collection: true })

  const originalPrice = event.price
  const originalOwner = entity.currentOwner ?? undefined

  entity.price = BigInt(0)
  entity.currentOwner = event.caller
  entity.updatedAt = event.timestamp

  if (originalPrice) {
    entity.collection.volume += originalPrice
    if (originalPrice > entity.collection.highestSale) {
      entity.collection.highestSale = originalPrice
    }
  }

  const { floor } = await calculateCollectionFloor(context.store, entity.collection.id, id)
  const { ownerCount, distribution } = await calculateCollectionOwnerCountAndDistribution(
    context.store,
    entity.collection.id,
    entity.currentOwner,
    originalOwner
  )
  entity.collection.floor = floor
  entity.collection.ownerCount = ownerCount
  entity.collection.distribution = distribution
  entity.collection.updatedAt = event.timestamp

  success(OPERATION, `${id} by ${event.caller} for ${String(event.price)}`)
  await context.store.save(entity)
  await context.store.save(entity.collection)
  const meta = String(event.price || '')
  await createEvent(entity, OPERATION, event, meta, context.store, event.currentOwner)

  if (entity.royalty && entity.recipient) {
    const OPERATION_PAY_ROYALTY = Action.PAY_ROYALTY
    success(OPERATION_PAY_ROYALTY, `pay ${entity.royalty} to ${entity.recipient} for item ${entity.id}`)
    await createEvent(entity, OPERATION_PAY_ROYALTY, event, String(entity.royalty), context.store, entity.recipient)
  }
}
