import { getOrFail as get, getOrCreate } from '@kodadot1/metasquid/entity'
import { CollectionEntity as CE, NFTEntity as NE, OfferStatus, Swap } from '../../model'
import { createEvent } from '../shared/event'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Action, Context, createTokenId, isNFT } from '../utils/types'
import { getSwapCreatedEvent } from './getters'
import { tokenIdOf } from './types'

const OPERATION = Action.SWAP

export async function handleCreateSwap(context: Context): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getSwapCreatedEvent)
  debug(OPERATION, event, true)

  // TODO: SWAP CAN BE OVERWRITTEN!
  const id = createTokenId(event.collectionId, event.sn)
  const final = await getOrCreate(context.store, Swap, id, {})
  const deadline = BigInt(event.deadline)
  // the nft that is being swapped
  const nft = await get(context.store, NE, id)
  const considered = await get(context.store, CE, event.consideration.collectionId)
  const desired = isNFT(event.consideration) ? await get(context.store, NE, tokenIdOf(event as any)) : undefined

  final.blockNumber = BigInt(event.blockNumber)
  final.createdAt = event.timestamp
  final.caller = event.caller
  final.nft = nft
  final.considered = considered
  final.desired = desired
  final.price = event.price
  final.surcharge = event.surcharge
  final.status = final.blockNumber >= deadline ? OfferStatus.EXPIRED : OfferStatus.ACTIVE
  final.updatedAt = event.timestamp

  // TODO: SAVE SOMEWHERE

  // success(OPERATION, `${id} by ${event.caller} for ${String(event.price)}`)
  await context.store.save(final)
  
  // SwapCreated {
  //   offered_collection: T::CollectionId,
  //   offered_item: T::ItemId,
  //   desired_collection: T::CollectionId,
  //   desired_item: Option<T::ItemId>,
  //   price: Option<PriceWithDirection<ItemPrice<T, I>>>,
  //   deadline: BlockNumberFor<T>,
  // },
}
