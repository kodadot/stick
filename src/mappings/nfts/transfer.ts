import { getOrFail } from '@kodadot1/metasquid/entity'
import { NFTEntity as NE, CollectionEntity as CE } from '../../model'
import { createEvent } from '../shared/event'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Action, Context, createTokenId } from '../utils/types'
import { calculateCollectionOwnerCountAndDistribution } from '../utils/helper'
import { getTransferTokenEvent } from './getters'

const OPERATION = Action.SEND

export async function handleTokenTransfer(context: Context): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getTransferTokenEvent)
  debug(OPERATION, event)

  const id = createTokenId(event.collectionId, event.sn)
  const entity = await getOrFail<NE>(context.store, NE, id)
  const collection = await getOrFail<CE>(context.store, CE, event.collectionId)

  const oldOwner = entity.currentOwner
  entity.price = BigInt(0)
  entity.currentOwner = event.to
  entity.updatedAt = event.timestamp

  const { ownerCount, distribution } = await calculateCollectionOwnerCountAndDistribution(
    context.store,
    collection.id,
    entity.currentOwner,
    oldOwner
  )
  collection.ownerCount = ownerCount
  collection.distribution = distribution

  success(OPERATION, `${id} from ${event.caller} to ${event.to}`)
  await context.store.save(entity)
  await context.store.save(collection)
  await createEvent(entity, OPERATION, event, event.to, context.store, oldOwner)
}
