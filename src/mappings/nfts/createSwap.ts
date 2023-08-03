import { getOrFail as get, create } from '@kodadot1/metasquid/entity'
import {
  CollectionEntity as CE,
  NFTEntity as NE,
  Swap
} from '../../model'
import { createEvent } from '../shared/event'
import { unwrap } from '../utils/extract'
import { debug, pending, success, warn } from '../utils/logger'
import { Context, createSwapId, createTokenId } from '../utils/types'
import { getCreateSwapEvent } from './getters'

const OPERATION: any = 'CREATE_SWAP' // Action.PAY_ROYALTY

export async function handleSwapCreate(context: Context): Promise<void> {
  pending(OPERATION, `${context.block.height}`);
  const event = unwrap(context, getCreateSwapEvent);
  debug(OPERATION, event, true);

  const id = createTokenId(event.collectionId, event.sn);
  const entity = await get(context.store, NE, id);

  const swapId = createSwapId(event.collectionId, event.sn);
  const swap = create(Swap, swapId, {
    createdAt: event.timestamp,
    updatedAt: event.timestamp,
    blockNumber: BigInt(event.blockNumber),
  })

  swap.nft = entity;

  if (event.consideration.sn) {
    const targetId = createTokenId(event.consideration.collectionId, event.consideration.sn);
    const target = await get(context.store, NE, targetId);
    swap.item = target;
  } else {
    const target = await get(context.store, CE, event.consideration.collectionId);
    swap.collection = target;
  }
  success(OPERATION, swapId);
  // await context.store.save(swap);
  // todo create event
  // entity.swap = swap;
}