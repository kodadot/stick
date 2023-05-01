import { getWith } from '@kodadot1/metasquid/entity'
import {
  NFTEntity as NE
} from '../../model'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Action, Context, createTokenId } from '../utils/types'
import { getPriceTokenEvent } from './getters'
import { createEvent } from '../shared/event'

const OPERATION = Action.LIST
const UNLIST = Action.UNLIST

export async function handleTokenList(context: Context): Promise<void> {
  pending(OPERATION, `${context.block.height}`);
  const event = unwrap(context, getPriceTokenEvent);
  debug(OPERATION, event);

  const id = createTokenId(event.collectionId, event.sn);
  const entity = await getWith(context.store, NE, id, { collection: true });

  entity.price = event.price;

  // TODO: update collection Floor
  
  success(OPERATION, `${id} by ${event.caller}} for ${String(event.price)}`);
  await context.store.save(entity);
  const meta = String(event.price || '');
  const interaction = event.price ? OPERATION : UNLIST;
  await createEvent(entity, interaction, event, meta, context.store);
}