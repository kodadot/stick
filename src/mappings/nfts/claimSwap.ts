import { getWith } from '@kodadot1/metasquid/entity'
import { NFTEntity as NE } from '../../model'
import { createEvent } from '../shared/event'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Action, Context } from '../utils/types'
import { getSwapClaimedEvent } from './getters'

const OPERATION = Action.SEND

export async function handleClaimSwap(context: Context): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getSwapClaimedEvent)
  debug(OPERATION, event)

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
