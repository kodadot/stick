import { getOrFail as get } from '@kodadot1/metasquid/entity'
import { CollectionEntity as CE } from '../../model'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Action, Context } from '../utils/types'
import { getLockCollectionEvent } from './getters'

const OPERATION = Action.LOCK

/**
 * Handle the collection lock event (Nfts.CollectionMaxSupplySet)
 * Sets the max supply of the collection
 * Logs Action.LOCK event
 * @param context - the context for the event
 **/
export async function handleCollectionLock(context: Context): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getLockCollectionEvent)
  debug(OPERATION, event)

  const entity = await get(context.store, CE, event.id)
  entity.max = event.max

  success(OPERATION, `${event.id} by ${event.caller}`)
  await context.store.save(entity)
}
