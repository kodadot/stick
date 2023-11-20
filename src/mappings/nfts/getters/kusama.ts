import { Interaction } from '../../../model'
import { NonFungible as Event } from '../../../processable'
import { uniques as events } from '../../../types/kusama/events'
import { addressOf } from '../../utils/helper'
import { warn } from '../../utils/logger'
import { Context } from '../../utils/types'
import {
  BurnTokenEvent,
  BuyTokenEvent,
  ChangeCollectionOwnerEvent,
  ChangeCollectionTeam,
  CreateCollectionEvent,
  CreateTokenEvent,
  DestroyCollectionEvent,
  ForceCreateCollectionEvent,
  ListTokenEvent,
  LockCollectionEvent,
  SetAttribute,
  SetMetadata,
  TransferTokenEvent,
} from '../types'

export function getCreateCollectionEvent(ctx: Context): CreateCollectionEvent {
  const event = events.created

  if (event.v9230.is(ctx)) {
    const { collection: classId, creator, owner } = event.v9230.decode(ctx)
    return { id: classId.toString(), caller: addressOf(creator), owner: addressOf(owner) }
  }
  warn(Interaction.CREATE, 'USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, creator, owner } = ctx._chain.decodeEvent(ctx.event)
  return { id: classId.toString(), caller: addressOf(creator), owner: addressOf(owner) }
}

export function getForceCreateCollectionEvent(ctx: Context): ForceCreateCollectionEvent {
  const event = events.forceCreated

  if (event.v9230.is(ctx)) {
    const { collection: classId, owner } = event.v9230.decode(ctx)
    return { id: classId.toString(), owner: addressOf(owner) }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, owner } = ctx._chain.decodeEvent(ctx.event)
  return { id: classId.toString(), owner: addressOf(owner) }
}

export function getCreateTokenEvent(ctx: Context): CreateTokenEvent {
  const event = events.issued

  if (event.v9230.is(ctx)) {
    const { collection: classId, item: instanceId, owner } = event.v9230.decode(ctx)
    return { collectionId: classId.toString(), owner: addressOf(owner), sn: instanceId.toString() }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, item: instanceId, owner } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: classId.toString(), owner: addressOf(owner), sn: instanceId.toString() }
}

export function getTransferTokenEvent(ctx: Context): TransferTokenEvent {
  const event = events.transferred

  if (event.v9230.is(ctx)) {
    const { collection: classId, item: instanceId, from, to } = event.v9230.decode(ctx)
    return { collectionId: classId.toString(), caller: addressOf(from), sn: instanceId.toString(), to: addressOf(to) }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, item: instanceId, from, to } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: classId.toString(), caller: addressOf(from), sn: instanceId.toString(), to: addressOf(to) }
}

export function getBurnTokenEvent(ctx: Context): BurnTokenEvent {
  const event = events.burned

  if (event.v9230.is(ctx)) {
    const { collection: classId, item: instanceId, owner } = event.v9230.decode(ctx)
    return { collectionId: classId.toString(), owner: addressOf(owner), sn: instanceId.toString() }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, item: instanceId, owner } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: classId.toString(), owner: addressOf(owner), sn: instanceId.toString() }
}

export function getDestroyCollectionEvent(ctx: Context): DestroyCollectionEvent {
  const event = events.destroyed

  if (event.v9230.is(ctx)) {
    const { collection: classId } = event.v9230.decode(ctx)
    return { id: classId.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId } = ctx._chain.decodeEvent(ctx.event)
  return { id: classId.toString() }
}

export function getListTokenEvent(ctx: Context): ListTokenEvent {
  const event = events.itemPriceSet

  if (event.v9270.is(ctx)) {
    const { collection: classId, item: instanceId, price } = event.v9270.decode(ctx)
    return { collectionId: classId.toString(), sn: instanceId.toString(), price }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, item: instanceId, price } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: classId.toString(), sn: instanceId.toString(), price }
}

export function getUnListTokenEvent(ctx: Context): ListTokenEvent {
  const event = events.itemPriceRemoved

  if (event.v9270.is(ctx)) {
    const { collection: classId, item: instanceId } = event.v9270.decode(ctx)
    return { collectionId: classId.toString(), sn: instanceId.toString(), price: 0n }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, item: instanceId, price } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: classId.toString(), sn: instanceId.toString(), price: 0n }
}

export function getPriceTokenEvent(ctx: Context): ListTokenEvent {
  if (ctx.event.name === Event.setPrice) {
    return getListTokenEvent(ctx)
  }

  return getUnListTokenEvent(ctx)
}

export function getBuyTokenEvent(ctx: Context): BuyTokenEvent {
  const event = events.itemBought

  if (event.v9270.is(ctx)) {
    const { collection: classId, item: instanceId, price, seller, buyer } = event.v9270.decode(ctx)
    return {
      collectionId: classId.toString(),
      caller: addressOf(buyer),
      sn: instanceId.toString(),
      price: BigInt(price ?? 0),
      currentOwner: addressOf(seller),
    }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, item: instanceId, price, seller, buyer } = ctx._chain.decodeEvent(ctx.event)
  return {
    collectionId: classId.toString(),
    caller: addressOf(buyer),
    sn: instanceId.toString(),
    price: BigInt(price ?? 0),
    currentOwner: addressOf(seller),
  }
}

export function getLockCollectionEvent(ctx: Context): LockCollectionEvent {
  const event = events.collectionMaxSupplySet
  if (event.v9230.is(ctx)) {
    const { collection: classId, maxSupply: max } = event.v9230.decode(ctx)
    return { id: classId.toString(), max }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, mamaxSupply: max } = ctx._chain.decodeEvent(ctx.event)
  return { id: classId.toString(), max }
}

export function getChangeCollectionOwnerEvent(ctx: Context): ChangeCollectionOwnerEvent {
  const event = events.ownerChanged

  if (event.v9230.is(ctx)) {
    const { collection: classId, newOwner } = event.v9230.decode(ctx)
    return { id: classId.toString(), owner: addressOf(newOwner) }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, newOwner } = ctx._chain.decodeEvent(ctx.event)
  return { id: classId.toString(), owner: addressOf(newOwner) }
}

export function getClearCollectionMetadataEvent(ctx: Context): SetMetadata {
  const event = events.collectionMetadataCleared

  if (event.v9230.is(ctx)) {
    const { collection: classId } = event.v9230.decode(ctx)
    return { collectionId: classId.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: classId.toString() }
}

export function getCreateCollectionMetadataEvent(ctx: Context): SetMetadata {
  const event = events.collectionMetadataSet

  if (event.v9230.is(ctx)) {
    const { collection: classId, data } = event.v9230.decode(ctx)
    return { collectionId: classId.toString(), metadata: data.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { class: classId, data, isFrozen } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: classId.toString(), metadata: data.toString() }
}

export function getClearClassMetadataEvent(ctx: Context): SetMetadata {
  const event = events.collectionMetadataSet

  if (event.v9230.is(ctx)) {
    const { collection: classId, data } = event.v9230.decode(ctx)
    return { collectionId: classId.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { class: classId } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: classId.toString() }
}

export function getCreateClassMetadataEvent(ctx: Context): SetMetadata {
  const event = events.collectionMetadataSet

  if (event.v9230.is(ctx)) {
    const { collection: classId, data } = event.v9230.decode(ctx)
    return { collectionId: classId.toString(), metadata: data.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { class: classId, data, isFrozen } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: classId.toString(), metadata: data.toString() }
}

export function getCreateMetadataEvent(ctx: Context): SetMetadata {
  const event = events.metadataSet

  if (event.v9230.is(ctx)) {
    const { collection: classId, item: instanceId, data } = event.v9230.decode(ctx)
    return { collectionId: classId.toString(), sn: instanceId.toString(), metadata: data.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, item: instanceId, data, isFrozen } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: classId.toString(), sn: instanceId.toString(), metadata: data.toString() }
}

export function getClearMetadataEvent(ctx: Context): SetMetadata {
  const event = events.metadataCleared

  if (event.v9230.is(ctx)) {
    const { collection: classId, item: instanceId } = event.v9230.decode(ctx)
    return { collectionId: classId.toString(), sn: instanceId.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, item: instanceId } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: classId.toString(), sn: instanceId.toString() }
}

export function getMetadataEvent(ctx: Context): SetMetadata {
  switch (ctx.event.name) {
    case Event.setCollectionMetadata:
      return getCreateCollectionMetadataEvent(ctx)
    case Event.clearCollectionMetadata:
      return getClearCollectionMetadataEvent(ctx)
    case Event.setMetadata:
      return getCreateMetadataEvent(ctx)
    case Event.clearMetadata:
      return getClearMetadataEvent(ctx)
    default:
      throw new Error('Unsupported event')
  }
}

function getSetAttributeEvent(ctx: Context): SetAttribute {
  const event = events.attributeSet
  if (event.v9230.is(ctx)) {
    const { collection: classId, maybeItem: instanceId, key, value } = event.v9230.decode(ctx)
    return {
      collectionId: classId.toString(),
      sn: instanceId?.toString(),
      trait: key.toString(),
      value: value.toString(),
    }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, maybeItem: instanceId, key, value } = ctx._chain.decodeEvent(ctx.event)
  return {
    collectionId: classId.toString(),
    sn: instanceId?.toString(),
    trait: key.toString(),
    value: value.toString(),
  }
}

function getClearAttributeEvent(ctx: Context): SetAttribute {
  const event = events.attributeCleared

  if (event.v9230.is(ctx)) {
    const { collection: classId, maybeItem: instanceId, key } = event.v9230.decode(ctx)
    return { collectionId: classId.toString(), sn: instanceId?.toString(), trait: key.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, maybeItem: instanceId, key } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: classId.toString(), sn: instanceId?.toString(), trait: key.toString() }
}

export function getAttributeEvent(ctx: Context): SetAttribute {
  switch (ctx.event.name) {
    case Event.setAttribute:
      return getSetAttributeEvent(ctx)
    case Event.clearAttribute:
      return getClearAttributeEvent(ctx)
    default:
      throw new Error('Unsupported event')
  }
}

export function getChangeTeamEvent(ctx: Context): ChangeCollectionTeam {
  const event = events.teamChanged

  if (event.v9230.is(ctx)) {
    const { collection: classId, issuer, admin, freezer } = event.v9230.decode(ctx)
    return {
      id: classId.toString(),
      issuer: issuer ? addressOf(issuer) : '',
      admin: admin ? addressOf(admin) : '',
      freezer: freezer ? addressOf(freezer) : '',
    }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, issuer, admin, freezer } = ctx._chain.decodeEvent(ctx.event)
  return {
    id: classId.toString(),
    issuer: issuer ? addressOf(issuer) : '',
    admin: admin ? addressOf(admin) : '',
    freezer: freezer ? addressOf(freezer) : '',
  }
}
