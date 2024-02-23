import { getOrFail as get } from '@kodadot1/metasquid/entity'
import { CollectionEntity as CE, CollectionType } from '../../model'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Context } from '../utils/types'
import { getUpdateMintCall } from './getters'
import { collectionSettingOf } from './types'

const OPERATION = 'UPDATE' as any

/**
 * Handle the collection mint update call (Nfts.update_mint_settings)
 * Updates the mint settings of the collection
 * Logs Action.UPDATE event
 * @param context - the context for the event
 **/
export async function handleCollectionMintUpdate(context: Context): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getUpdateMintCall)
  debug(OPERATION, event)

  const entity = await get(context.store, CE, event.id)

  entity.type = event.type.__kind as CollectionType
  entity.settings = collectionSettingOf(event)

  success(OPERATION, `${event.id} by ${event.caller}`)
  await context.store.save(entity)
}
 