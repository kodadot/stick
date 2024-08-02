import { getOrFail as get } from '@kodadot1/metasquid/entity'
import { Offer, Swap, TradeStatus } from '../../model'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Context, createTokenId, isOffer } from '../utils/types'
import { getSwapClaimedEvent } from './getters'

const OPERATION = TradeStatus.ACCEPTED

/**
 * Handle the atomic swap claim event (Nfts.SwapClaimed)
 * Marks the swap as accepted
 * Logs Nothing
 * @param context - the context for the event
**/
export async function handleClaimSwap(context: Context): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getSwapClaimedEvent)
  debug(OPERATION, event, true)

  const id = createTokenId(event.collectionId, event.sn)
  const offer = isOffer(event)
  const entity = offer ? await get(context.store, Offer, id) : await get(context.store, Swap, id)

  entity.status = TradeStatus.ACCEPTED
  entity.updatedAt = event.timestamp

  success(OPERATION, `${id} by ${event.caller}`)

  await context.store.save(entity)

  // SwapClaimed {
  //   sent_collection: T::CollectionId,
  //   sent_item: T::ItemId,
  //   sent_item_owner: T::AccountId,
  //   received_collection: T::CollectionId,
  //   received_item: T::ItemId,
  //   received_item_owner: T::AccountId,
  //   price: Option<PriceWithDirection<ItemPrice<T, I>>>,
  //   deadline: BlockNumberFor<T>,
  // },
}
