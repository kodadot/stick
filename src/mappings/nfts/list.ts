import { getWith } from '@kodadot1/metasquid/entity'
import { NFTEntity as NE } from '../../model'
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
  const entity = await getWith(context.store, NE, id, { collection: true })

  entity.price = event.price

  if (entity.price && (entity.collection.floor === 0n || entity.price < entity.collection.floor)) {
    entity.collection.floor = entity.price
  }

  success(OPERATION, `${id} by ${event.caller}} for ${String(event.price)}`)
  await context.store.save(entity)
  const meta = String(event.price || '')
  const interaction = event.price ? OPERATION : UNLIST
  await createEvent(entity, interaction, event, meta, context.store)
}
