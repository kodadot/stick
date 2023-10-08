import { getWith } from '@kodadot1/metasquid/entity'
import { NFTEntity as NE } from '../../model'
import { createEvent } from '../shared/event'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Action, Context, createTokenId } from '../utils/types'
import { calculateCollectionOwnerCountAndDistribution } from '../utils/helper'
import { buyHandler } from '../shared/token'
import { getBuyTokenEvent } from './getters'

const OPERATION = Action.BUY

export async function handleTokenBuy(context: Context): Promise<void> {
  // pending(OPERATION, `${context.block.height}`)
  // const event = unwrap(context, getBuyTokenEvent)
  // debug(OPERATION, event, true)

  // const id = createTokenId(event.collectionId, event.sn)
  // const entity = await getWith(context.store, NE, id, { collection: true })

  // const originalPrice = entity.price
  // const originalOwner = entity.currentOwner ?? undefined

  // entity.price = BigInt(0)
  // entity.currentOwner = event.caller
  // entity.updatedAt = event.timestamp
  // if (originalPrice) {
  //   entity.collection.volume += originalPrice
  //   if (originalPrice > entity.collection.highestSale) {
  //     entity.collection.highestSale = originalPrice
  //   }
  // }
  // const { ownerCount, distribution } = await calculateCollectionOwnerCountAndDistribution(
  //   context.store,
  //   entity.collection.id,
  //   entity.currentOwner,
  //   originalOwner
  // )
  // entity.collection.ownerCount = ownerCount
  // entity.collection.distribution = distribution

  // await buyHandler(context, entity)

  // success(OPERATION, `${id} by ${event.caller} for ${String(event.price)}`)
  // await context.store.save(entity)
  // const meta = String(event.price || '')
  // await createEvent(entity, OPERATION, event, meta, context.store, event.currentOwner)
}
