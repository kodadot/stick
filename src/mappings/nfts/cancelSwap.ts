import { getOrFail as get } from '@kodadot1/metasquid/entity'
import { Offer, Swap, TradeStatus } from '../../model'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Context, createTokenId, isOffer } from '../utils/types'
import { getSwapCancelledEvent } from './getters'

const OPERATION = TradeStatus.WITHDRAWN

/**
 * Handle the atomic swap cancel event (Nfts.SwapCancelled)
 * Marks the swap as withdrawn
 * Logs Nothing
 * @param context - the context for the event
 **/
export async function handleCancelSwap(context: Context): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getSwapCancelledEvent)
  debug(OPERATION, event, true)

  const id = createTokenId(event.collectionId, event.sn)
  const offer = isOffer(event)
  const entity = offer ? await get(context.store, Offer, id) : await get(context.store, Swap, id)

  entity.status = TradeStatus.WITHDRAWN
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
