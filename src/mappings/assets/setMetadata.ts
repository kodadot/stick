import { getOrCreate } from '@kodadot1/metasquid/entity'
import { unwrap } from '../utils/extract'
import { debug } from '../utils/logger'
import { Context } from '../utils/types'
// import { tokenIdOf } from './types'
import { AssetEntity as AE } from '../../model'
import { getCreateAssetMetadataEvent } from './getters'
import { ALLOW_LIST } from './forceToken'

const OPERATION = 'METADATA' as any

/**
 * Handle the asset metadata set event (Assets.MetadataSet)
 * Logs Action.METADATA event
 * @param context - the context for the event
 **/
export async function handleAssetMetadataSet(context: Context): Promise<void> {
  const event = unwrap(context, getCreateAssetMetadataEvent)
  debug(OPERATION, event)

  if (!ALLOW_LIST.includes(event.id)) {
    return
  }

  const final = await getOrCreate(context.store, AE, event.id, {})

  // if (!final) {
  //   warn(OPERATION, `MISSING ${event.collectionId}-${event.sn}`)
  //   return
  // }

  final.decimals = event.decimals
  final.name = event.name
  final.symbol = event.symbol

  await context.store.save(final)
}
