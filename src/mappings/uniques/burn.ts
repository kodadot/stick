import { getWith } from '@kodadot1/metasquid/entity'
import { NFTEntity as NE } from '../../model'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Action, Context, createTokenId } from '../utils/types'
import { createEvent } from '../shared/event'
import { calculateCollectionFloor, calculateCollectionOwnerCountAndDistribution } from '../utils/helper'
import { burnHandler } from '../shared/token'
import { getBurnTokenEvent } from './getters'

const OPERATION = Action.BURN

export async function handleTokenBurn(context: Context): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getBurnTokenEvent)
  debug(OPERATION, event)

  const id = createTokenId(event.collectionId, event.sn)
  const entity = await getWith(context.store, NE, id, { collection: true })

  const { floor } = await calculateCollectionFloor(context.store, entity.collection.id, id)
  const { ownerCount, distribution } = await calculateCollectionOwnerCountAndDistribution(
    context.store,
    entity.collection.id,
    entity.currentOwner
  )

  entity.burned = true
  entity.updatedAt = event.timestamp

  entity.collection.supply -= 1
  entity.collection.floor = floor
  entity.collection.ownerCount = ownerCount
  entity.collection.distribution = distribution
  entity.collection.updatedAt = event.timestamp

  await burnHandler(context, entity)

  success(OPERATION, `${id} by ${event.caller}`)
  await context.store.save(entity)
  await context.store.save(entity.collection)
  const meta = entity.metadata ?? ''
  await createEvent(entity, OPERATION, event, meta, context.store)
}
