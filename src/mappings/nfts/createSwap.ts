import { getOrFail as get, getOrCreate } from '@kodadot1/metasquid/entity'
import { CollectionEntity as CE, NFTEntity as NE, Offer, Swap, TradeStatus } from '../../model'
import { unwrap } from '../utils/extract'
import { debug, pending, success, warn } from '../utils/logger'
import { Action, Context, createTokenId, isNFT, isOffer } from '../utils/types'
import { getSwapCreatedEvent } from './getters'
import { tokenIdOf } from './types'

const OPERATION = Action.SWAP

/**
 * Handle the atomic swap create event (Nfts.SwapCreated)
 * Marks the swap as active
 * Logs Action.SWAP event
 * @param context - the context for the event
 **/
export async function handleCreateSwap(context: Context): Promise<void> {
  // let TRUE_OPERATION = OPERATION;

  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getSwapCreatedEvent)
  debug(OPERATION, event, true)
  let offer = false

  if (isOffer(event)) {
    // Validate offer
    offer = Boolean(event.price && event.price > 0n && event.surcharge === 'Send')
    warn(OPERATION, `Will be treated as **${Action.OFFER}**`)
    // TRUE_OPERATION = Action.OFFER
  }
  // DEV_NOT: SWAP CAN BE OVERWRITTEN!
  const id = createTokenId(event.collectionId, event.sn)
  const final = offer ? await getOrCreate(context.store, Offer, id, {}) : await getOrCreate(context.store, Swap, id, {})
  const deadline = BigInt(event.deadline)
  // the nft that is being swapped
  const nft = await get(context.store, NE, id)
  const considered = await get(context.store, CE, event.consideration.collectionId)
  const desired = isNFT(event.consideration) ? await get(context.store, NE, tokenIdOf(event.consideration as any)) : undefined

  final.blockNumber = BigInt(event.blockNumber)
  final.createdAt = event.timestamp
  final.caller = event.caller
  final.nft = nft
  final.considered = considered
  final.desired = desired
  final.expiration = deadline
  final.price = event.price
  if ('surcharge' in final) {
    final.surcharge = event.surcharge
  }
  final.status = final.blockNumber >= deadline ? TradeStatus.EXPIRED : TradeStatus.ACTIVE
  final.updatedAt = event.timestamp

  await context.store.save(final)

  // DEV_NOTE: need to be first enabled by schema (line 82)
  // if ('swap' in nft) {
  //   nft.swap = final
  //   await context.store.save(nft)
  // }

  success(OPERATION, `${id} by ${event.caller} by ${event.caller}`)
  
  // SwapCreated {
  //   offered_collection: T::CollectionId,
  //   offered_item: T::ItemId,
  //   desired_collection: T::CollectionId,
  //   desired_item: Option<T::ItemId>,
  //   price: Option<PriceWithDirection<ItemPrice<T, I>>>,
  //   deadline: BlockNumberFor<T>,
  // },
}
