import { assets as events } from '../../../types/kusama/events'
import { addressOf, idOf } from '../../utils/helper'
import { Event } from '../../utils/types'

export function getCreateAssetEvent(ctx: Event) {
  const event = events.created

  if (event.v1.is(ctx)) {
    const [classId, creator, owner] = event.v1.decode(ctx)
    return { id: idOf(classId), caller: addressOf(creator), owner: addressOf(owner) }
  }
  if (event.v700.is(ctx)) {
    const { assetId: classId, creator, owner } = event.v700.decode(ctx)
    return { id: idOf(classId), caller: addressOf(creator), owner: addressOf(owner) }
  }

  // warn(Interaction.CREATE, 'USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { assetId: classId, creator, owner } = event.v700.decode(ctx)
  return { id: idOf(classId), caller: addressOf(creator), owner: addressOf(owner) }
}

export function getForceCreateAssetEvent(ctx: Event) {
  const event = events.forceCreated
  if (event.v1.is(ctx)) {
    const [classId, owner] = event.v1.decode(ctx)
    return { id: idOf(classId), owner: addressOf(owner) }
  }
  if (event.v700.is(ctx)) {
    const { assetId: classId, owner } = event.v700.decode(ctx)
    return { id: idOf(classId), owner: addressOf(owner) }
  }
  
  const { assetId: classId, owner } = event.v700.decode(ctx)
  return { id: idOf(classId), owner: addressOf(owner) }
}

export function getCreateAssetMetadataEvent(ctx: Event) {
  const event = events.metadataSet

  if (event.v1.is(ctx)) {
    const [assetId, name, symbol, decimals, isFrozen] = event.v1.decode(ctx)
    return { assetId, name, symbol, decimals, isFrozen }
  }

  
  const { assetId, name, symbol, decimals, isFrozen } = event.v700.decode(ctx)
  return { assetId, name, symbol, decimals, isFrozen }
}