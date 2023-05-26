import { create } from '@kodadot1/metasquid/entity'
import { Store } from '@kodadot1/metasquid/types'

import { nanoid } from 'nanoid'
import { Event, Interaction, NFTEntity } from '../../model'
import { error } from '../utils/logger'
import { Action, BaseCall, eventFrom } from '../utils/types'

export const eventId = (id: string, event: Action) => `${id}-${event}${nanoid()}`

export async function createEvent(
  final: NFTEntity,
  interaction: Interaction,
  call: BaseCall,
  meta: string,
  store: Store,
  currentOwner?: string
) {
  try {
    const newEventId = eventId(final.id, interaction)
    const event = create<Event>(Event, newEventId, eventFrom(interaction, call, meta, currentOwner))
    event.nft = final
    await store.save(event)
  } catch (e) {
    error(e, interaction, final.id)
  }
}
