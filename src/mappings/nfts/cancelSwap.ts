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
import { getCancelSwapEvent, getCreateSwapEvent } from './getters'

const OPERATION: any = 'CANCEL_SWAP' // Action.PAY_ROYALTY

export async function handleSwapCancel(context: Context): Promise<void> {
  pending(OPERATION, `${context.block.height}`);
  const event = unwrap(context, getCancelSwapEvent);
  debug(OPERATION, event, true);

  const swapId = createSwapId(event.collectionId, event.sn);
  const swap = await get(context.store, Swap, swapId);
  success(OPERATION, swapId);
  // await context.store.remove(swap);
}