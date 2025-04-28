import { getOrFail as get } from '@kodadot1/metasquid/entity'
import { CollectionEntity as CE, Offer, Swap, TradeStatus } from '../../model'
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
  const collection = await get<CE>(context.store, CE, event.collectionId)

  entity.status = TradeStatus.ACCEPTED
  entity.updatedAt = event.timestamp
  
  collection.updatedAt = event.timestamp

  if (event.price) {
    collection.volume += event.price
    if (event.price > collection.highestSale) {
      collection.highestSale = event.price
    }
  }

  success(OPERATION, `${id} by ${event.caller}`)

  await context.store.save(entity)
  await context.store.save(collection)

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
