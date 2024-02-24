import { getWith } from '@kodadot1/metasquid/entity'
import { NFTEntity as NE } from '../../model'
import { createEvent } from '../shared/event'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Action, Context, createTokenId } from '../utils/types'
import { calculateCollectionOwnerCountAndDistribution } from '../utils/helper'
import { getTransferTokenEvent } from './getters'

const OPERATION = Action.SEND

/**
 * Handle the token transfer event (Uniques.Transferred)
 * Changes the owner of the token, updates the collection owner count and distribution
 * Logs Action.SEND event
 * @param context - the context for the event
 **/
export async function handleTokenTransfer(context: Context): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getTransferTokenEvent)
  debug(OPERATION, event)

  const id = createTokenId(event.collectionId, event.sn)
  const entity = await getWith(context.store, NE, id, { collection: true })

  const oldOwner = entity.currentOwner
  entity.price = BigInt(0)
  entity.currentOwner = event.to
  entity.updatedAt = event.timestamp

  const { ownerCount, distribution } = await calculateCollectionOwnerCountAndDistribution(
    context.store,
    entity.collection.id,
    entity.currentOwner,
    oldOwner
  )
  entity.collection.ownerCount = ownerCount
  entity.collection.distribution = distribution

  success(OPERATION, `${id} from ${event.caller} to ${event.to}`)
  await context.store.save(entity)
  await context.store.save(entity.collection)
  await createEvent(entity, OPERATION, event, event.to, context.store, oldOwner)
}
