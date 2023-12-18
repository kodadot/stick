import { getOrFail } from '@kodadot1/metasquid/entity'
import { NFTEntity as NE, CollectionEntity as CE } from '../../model'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Action, Context, createTokenId } from '../utils/types'
import { createEvent } from '../shared/event'
import { calculateCollectionOwnerCountAndDistribution } from '../utils/helper'
import { burnHandler } from '../shared/token'
import { getBurnTokenEvent } from './getters'

const OPERATION = Action.BURN

export async function handleTokenBurn(context: Context): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getBurnTokenEvent)
  debug(OPERATION, event)

  const id = createTokenId(event.collectionId, event.sn)
  const entity = await getOrFail<NE>(context.store, NE, id)
  const collection = await getOrFail<CE>(context.store, CE, event.collectionId)

  const { ownerCount, distribution } = await calculateCollectionOwnerCountAndDistribution(
    context.store,
    collection.id,
    entity.currentOwner
  )

  entity.burned = true
  entity.updatedAt = event.timestamp

  collection.updatedAt = event.timestamp
  collection.supply -= 1
  collection.ownerCount = ownerCount
  collection.distribution = distribution

  await burnHandler(context, entity)

  success(OPERATION, `${id} by ${event.caller}`)
  await context.store.save(entity)
  await context.store.save(collection)
  const meta = entity.metadata ?? ''
  await createEvent(entity, OPERATION, event, meta, context.store)
}
