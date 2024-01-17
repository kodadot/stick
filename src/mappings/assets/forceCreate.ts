import { getOrCreate } from '@kodadot1/metasquid/entity'
import md5 from 'md5'
import { AssetEntity as AE } from '../../model'
import { handleMetadata } from '../shared/metadata'
import { unwrap } from '../utils/extract'
import { versionOf } from '../utils/helper'
import { debug, pending, success } from '../utils/logger'
import { Action, Context } from '../utils/types'
import { getForceCreateAssetEvent } from './getters'

const OPERATION = Action.CREATE

export async function handleForceCollectionCreate(context: Context): Promise<void> {
  pending(OPERATION, `[FORCE]: ${context.block.height}`)
  const event = unwrap(context, getForceCreateAssetEvent)
  debug(OPERATION, event)
  const final = await getOrCreate(context.store, AE, event.id, {})
  // plsBe(remintable, final);
  final.id = event.id

  success(OPERATION, `[ASSET] ${final.id}`)
  await context.store.save(final)
  // await createCollectionEvent(final, OPERATION, event, '', context.store);
}
