import { getOrFail as get } from '@kodadot1/metasquid/entity'
import { OfferStatus, Swap } from '../../model'
import { createEvent } from '../shared/event'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Action, Context, createTokenId } from '../utils/types'
import { getSwapCancelledEvent } from './getters'

const OPERATION = Action.SEND

export async function handleCancelSwap(context: Context): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getSwapCancelledEvent)
  debug(OPERATION, event)

  const id = createTokenId(event.collectionId, event.sn)
  const entity = await get(context.store, Swap, id)

  entity.status = OfferStatus.WITHDRAWN
  entity.updatedAt = event.timestamp

  success(OPERATION, `${id} by ${event.caller}`)

  await context.store.save(entity)
  // SwapCancelled {
  //   offered_collection: T::CollectionId,
  //   offered_item: T::ItemId,
  //   desired_collection: T::CollectionId,
  //   desired_item: Option<T::ItemId>,
  //   price: Option<PriceWithDirection<ItemPrice<T, I>>>,
  //   deadline: BlockNumberFor<T>,
  // },
}
