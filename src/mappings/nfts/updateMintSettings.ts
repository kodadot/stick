import { getOrFail as get } from '@kodadot1/metasquid/entity'
import { CollectionEntity as CE } from '../../model'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Context } from '../utils/types'
import { getUpdateMintCall } from './getters'
import { collectionSettingOf } from './types'

const OPERATION = 'UPDATE' as any

export async function handleCollectionMintUpdate(context: Context): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getUpdateMintCall)
  debug(OPERATION, event)

  const entity = await get(context.store, CE, event.id)

  // TODO: update mint settings
  entity.type = event.type.__kind as any
  entity.settings = collectionSettingOf(event)

  success(OPERATION, `${event.id} by ${event.caller}`)
  await context.store.save(entity)
}
 