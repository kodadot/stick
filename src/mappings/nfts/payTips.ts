import { getOptional } from '@kodadot1/metasquid/entity'
import { NFTEntity as NE } from '../../model'
import { createEvent } from '../shared/event'
import { unwrap } from '../utils/extract'
import { pending, debug } from '../utils/logger'
import { Action, Context, createTokenId } from '../utils/types'
import { getTipSentEvent } from './getters'

const OPERATION = Action.PAY_ROYALTY

export async function handleTipSend(context: Context): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getTipSentEvent)
  debug(OPERATION, event, true)

  const id = createTokenId(event.collection, event.item)
  const entity = await getOptional(context.store, NE, id)

  if (entity) {
    const meta = {
      receiver: String(event.receiver),
      amount: String(event.amount),
    }
    await createEvent(entity, OPERATION, event, meta.amount, context.store, meta.receiver)
  }
}
