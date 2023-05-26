import { getWith } from '@kodadot1/metasquid/entity'
import { NFTEntity as NE } from '../../model'
import { createEvent } from '../shared/event'
import { unwrap } from '../utils/extract'
import { debug, pending, success } from '../utils/logger'
import { Action, Context, createTokenId } from '../utils/types'
import { getTransferTokenEvent } from './getters'
import { calculateCollectionOwnerCountAndDistribution } from '../utils/helper'

const OPERATION = Action.SEND

export async function handleTokenTransfer(context: Context): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getTransferTokenEvent)
  debug(OPERATION, event)

  const id = createTokenId(event.collectionId, event.sn)
  const entity = await getWith(context.store, NE, id, { collection: true })

  const { currentOwner } = entity
  entity.price = BigInt(0)
  entity.currentOwner = event.to
  entity.updatedAt = event.timestamp

  const { ownerCount, distribution } = await calculateCollectionOwnerCountAndDistribution(
    context.store,
    entity.collection.id,
    entity.currentOwner,
    currentOwner
  )
  entity.collection.ownerCount = ownerCount
  entity.collection.distribution = distribution

  success(OPERATION, `${id} from ${event.caller} to ${event.to}`)
  await context.store.save(entity)
  await createEvent(entity, OPERATION, event, event.to, context.store, currentOwner)
}
