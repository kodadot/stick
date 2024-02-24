import { getOrFail as get } from '@kodadot1/metasquid/entity'
import { CollectionEntity as CE } from '../../model'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Action, Context } from '../utils/types'
import { getDestroyCollectionEvent } from './getters'

const OPERATION = Action.DESTROY

/**
 * Handle the collection destroy event (Nfts.Destroyed)
 * Marks the collection as burned
 * Logs Action.DESTROY event
 * @param context - the context for the event
 **/
export async function handleCollectionDestroy(context: Context): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getDestroyCollectionEvent)
  debug(OPERATION, event)

  const entity = await get(context.store, CE, event.id)
  entity.burned = true

  success(OPERATION, `${event.id} by ${event.caller}`)
  await context.store.save(entity)
}
