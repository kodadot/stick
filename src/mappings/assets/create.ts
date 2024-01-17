import { getOrCreate } from '@kodadot1/metasquid/entity'
import { AssetEntity as AE } from '../../model'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Action, Context } from '../utils/types'
import { getCreateAssetEvent } from './getters'

const OPERATION = Action.CREATE

export async function handleCollectionCreate(context: Context): Promise<void> {
  pending(OPERATION, `[ASSET++]: ${context.block.height}`)
  const event = unwrap(context, getCreateAssetEvent)
  debug(OPERATION, event)
  const final = await getOrCreate(context.store, AE, event.id, {})
  // plsBe(remintable, final);

  final.id = event.id

  success(OPERATION, `[ASSET] ${final.id}`)
  await context.store.save(final)
  // await createCollectionEvent(final, OPERATION, event, '', context.store);
}
