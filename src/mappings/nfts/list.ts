import { getOrFail } from '@kodadot1/metasquid/entity'
import { CollectionEntity as CE, NFTEntity as NE } from '../../model'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Action, Context, createTokenId } from '../utils/types'
import { createEvent } from '../shared/event'
import { getPriceTokenEvent } from './getters'

const OPERATION = Action.LIST
const UNLIST = Action.UNLIST

export async function handleTokenList(context: Context): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getPriceTokenEvent)
  debug(OPERATION, event, true)

  const id = createTokenId(event.collectionId, event.sn)
  const entity = await getOrFail<NE>(context.store, NE, id)
  const collection = await getOrFail<CE>(context.store, CE, event.collectionId)

  entity.price = event.price

  if (event.price && (collection.floor === 0n || event.price < collection.floor)) {
    collection.floor = event.price
  }

  success(OPERATION, `${id} by ${event.caller}} for ${String(event.price)}`)
  await context.store.save(entity)
  await context.store.save(collection)
  const meta = String(event.price || '')
  const interaction = event.price ? OPERATION : UNLIST
  await createEvent(entity, interaction, event, meta, context.store)
}
