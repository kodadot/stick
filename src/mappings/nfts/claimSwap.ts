import { getOrFail as get } from '@kodadot1/metasquid/entity'
import {
  NFTEntity as NE
} from '../../model'
import { createEvent } from '../shared/event'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Action, Context, createSwapId, createTokenId } from '../utils/types'
import { getClaimSwapEvent } from './getters'

const OPERATION = Action.SWAP

export async function handleSwapClaim(context: Context): Promise<void> {
  pending(OPERATION, `${context.block.height}`);
  const event = unwrap(context, getClaimSwapEvent);
  debug(OPERATION, event, true);

  const id = createTokenId(event.collectionId, event.sn);
  const targetId = createTokenId(event.target.collectionId, event.target.sn);
  const swapId = createSwapId(event.collectionId, event.sn);

  const entity = await get(context.store, NE, id);
  const target = await get(context.store, NE, targetId);

  entity.currentOwner = event.target.owner;
  entity.updatedAt = event.timestamp;

  target.currentOwner = event.owner;
  target.updatedAt = event.timestamp;

  success(OPERATION, `FROM ${entity.id} to ${target.id}`);
  // await context.store.save([entity, target]);

  // await createEvent(entity, OPERATION, event, target.id, context.store);
  // await createEvent(target, OPERATION, event, entity.id, context.store);
}