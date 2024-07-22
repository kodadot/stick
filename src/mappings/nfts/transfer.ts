import { getOptional, getWith } from '@kodadot1/metasquid/entity'
import { NFTEntity as NE, OfferStatus, Swap } from '../../model'
import { NonFungibleCall } from '../../processable'
import { createEvent } from '../shared/event'
import { unwrap } from '../utils/extract'
import { calculateCollectionOwnerCountAndDistribution } from '../utils/helper'
import { debug, pending, skip, success, warn } from '../utils/logger'
import { Action, Context, createTokenId } from '../utils/types'
import { getTransferTokenEvent } from './getters'

const OPERATION = Action.SEND

/**
 * Handle the token transfer event (Nfts.Transferred)
 * Changes the owner of the token, updates the collection owner count and distribution
 * Logs Action.SEND event
 * @param context - the context for the event
 **/
export async function handleTokenTransfer(context: Context): Promise<void> {
  // Handling swaps and other operations
  let TRUE_OPERATION = OPERATION;

  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getTransferTokenEvent)
  debug(OPERATION, event)

  // Check if event has a name and can be skipped in some canses
  switch (event.name) {
    case NonFungibleCall.buyItem:
      skip(OPERATION, `because it is **${event.name}**`)
      return
    case NonFungibleCall.claimSwap:
      warn(OPERATION, `Will be treated as **${Action.SWAP}**`)
      TRUE_OPERATION = Action.SWAP
      break
    default:
      break
  }

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

  success(TRUE_OPERATION, `${id} from ${event.caller} to ${event.to}`)
  await context.store.save(entity)
  await context.store.save(entity.collection)
  await createEvent(entity, TRUE_OPERATION, event, event.to, context.store, oldOwner)

  // remove swap if exists
  // PendingSwapOf::<T, I>::remove(&collection, &item);
  const swap = await getOptional(context.store, Swap, id)
  if (swap) {
    swap.status = OfferStatus.WITHDRAWN
    swap.updatedAt = event.timestamp
    await context.store.save(swap)
  }
}
