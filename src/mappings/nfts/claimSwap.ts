import { getOrFail as get } from '@kodadot1/metasquid/entity'
import { NFTEntity as NE, TradeStatus, Swap } from '../../model'
import { createEvent } from '../shared/event'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Action, Context, createTokenId } from '../utils/types'
import { getSwapClaimedEvent } from './getters'

const OPERATION = TradeStatus.ACCEPTED

export async function handleClaimSwap(context: Context): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getSwapClaimedEvent)
  debug(OPERATION, event, true)

  const id = createTokenId(event.collectionId, event.sn)
  const entity = await get(context.store, Swap, id)

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
