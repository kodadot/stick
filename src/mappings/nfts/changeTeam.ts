import { getOrFail as get } from '@kodadot1/metasquid/entity'
import {
  CollectionEntity as CE,
} from '../../model'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Action, Context } from '../utils/types'
import { getChangeTeamEvent } from './getters'

const OPERATION = Action.CHANGEISSUER

export async function handleCollectionTeamChange(context: Context): Promise<void> {
  pending(OPERATION, `${context.block.height}`);
  const event = unwrap(context, getChangeTeamEvent);
  debug(OPERATION, event);

  const entity = await get(context.store, CE, event.id);
  if (!event.issuer) {
    success(OPERATION, `No issuer for ${event.id}`);
    return;
  }

  entity.issuer = event.issuer;

  success(OPERATION, `${event.id} by ${event.caller}}`);
  await context.store.save(entity);
}