import { Interaction } from '../../../model'
import { uniques as events } from '../../../types/kusama/events'
import { addressOf, idOf, UNIQUE_PREFIX as U } from '../../utils/helper'
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
import { Unique as Event } from '../../../processable'


export function getCreateCollectionEvent(ctx: Context): CreateCollectionEvent {
  const event = events.created
  if (event.v1.is(ctx)) {
    const [classId, creator, owner] = event.v1.decode(ctx)
    return { id: idOf(classId, U), caller: addressOf(creator), owner: addressOf(owner) }
  }
  if (event.v700.is(ctx)) {
    const { class: classId, creator, owner } = event.v700.decode(ctx)
    return { id: idOf(classId, U), caller: addressOf(creator), owner: addressOf(owner) }
  }
  if (event.v9230.is(ctx)) {
    const { collection: classId, creator, owner } = event.v9230.decode(ctx)
    return { id: idOf(classId, U), caller: addressOf(creator), owner: addressOf(owner) }
  }
  warn(Interaction.CREATE, 'USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, creator, owner } = ctx._chain.decodeEvent(ctx.event)
  return { id: idOf(classId, U), caller: addressOf(creator), owner: addressOf(owner) }
}

export function getForceCreateCollectionEvent(ctx: Context): ForceCreateCollectionEvent {
  const event = events.forceCreated
  if (event.v1.is(ctx)) {
    const [classId, owner] = event.v1.decode(ctx)
    return { id: idOf(classId, U), owner: addressOf(owner) }
  }
  if (event.v700.is(ctx)) {
    const { class: classId, owner } = event.v700.decode(ctx)
    return { id: idOf(classId, U), owner: addressOf(owner) }
  }
  if (event.v9230.is(ctx)) {
    const { collection: classId, owner } = event.v9230.decode(ctx)
    return { id: idOf(classId, U), owner: addressOf(owner) }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, owner } = ctx._chain.decodeEvent(ctx.event)
  return { id: idOf(classId, U), owner: addressOf(owner) }
}

export function getCreateTokenEvent(ctx: Context): CreateTokenEvent {
  const event = events.issued
  if (event.v1.is(ctx)) {
    const [classId, instanceId, owner] = event.v1.decode(ctx)
    return { collectionId: idOf(classId, U), owner: addressOf(owner), sn: instanceId.toString() }
  }
  if (event.v700.is(ctx)) {
    const { class: classId, instance: instanceId, owner } = event.v700.decode(ctx)
    return { collectionId: idOf(classId, U), owner: addressOf(owner), sn: instanceId.toString() }
  }
  if (event.v9230.is(ctx)) {
    const { collection: classId, item: instanceId, owner } = event.v9230.decode(ctx)
    return { collectionId: idOf(classId, U), owner: addressOf(owner), sn: instanceId.toString() }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, item: instanceId, owner } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: idOf(classId, U), owner: addressOf(owner), sn: instanceId.toString() }
}

export function getTransferTokenEvent(ctx: Context): TransferTokenEvent {
  const event = events.transferred
  if (event.v1.is(ctx)) {
    const [classId, instanceId, from, to] = event.v1.decode(ctx)
    return { collectionId: idOf(classId, U), caller: addressOf(from), sn: instanceId.toString(), to: addressOf(to) }
  }
  if (event.v700.is(ctx)) {
    const { class: classId, instance: instanceId, from, to } = event.v700.decode(ctx)
    return { collectionId: idOf(classId, U), caller: addressOf(from), sn: instanceId.toString(), to: addressOf(to) }
  }
  if (event.v9230.is(ctx)) {
    const { collection: classId, item: instanceId, from, to } = event.v9230.decode(ctx)
    return { collectionId: idOf(classId, U), caller: addressOf(from), sn: instanceId.toString(), to: addressOf(to) }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, item: instanceId, from, to } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: idOf(classId, U), caller: addressOf(from), sn: instanceId.toString(), to: addressOf(to) }
}

export function getBurnTokenEvent(ctx: Context): BurnTokenEvent {
  const event = events.burned
  if (event.v1.is(ctx)) {
    const [classId, instanceId, owner] = event.v1.decode(ctx)
    return { collectionId: idOf(classId, U), owner: addressOf(owner), sn: instanceId.toString() }
  }
  if (event.v700.is(ctx)) {
    const { class: classId, instance: instanceId, owner } = event.v700.decode(ctx)
    return { collectionId: idOf(classId, U), owner: addressOf(owner), sn: instanceId.toString() }
  }
  if (event.v9230.is(ctx)) {
    const { collection: classId, item: instanceId, owner } = event.v9230.decode(ctx)
    return { collectionId: idOf(classId, U), owner: addressOf(owner), sn: instanceId.toString() }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, item: instanceId, owner } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: idOf(classId, U), owner: addressOf(owner), sn: instanceId.toString() }
}

export function getDestroyCollectionEvent(ctx: Context): DestroyCollectionEvent {
  const event = events.destroyed
  if (event.v1.is(ctx)) {
    const classId = event.v1.decode(ctx)
    return { id: idOf(classId, U) }
  }
  if (event.v700.is(ctx)) {
    const { class: classId } = event.v700.decode(ctx)
    return { id: idOf(classId, U) }
  }
  if (event.v9230.is(ctx)) {
    const { collection: classId } = event.v9230.decode(ctx)
    return { id: idOf(classId, U) }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId } = ctx._chain.decodeEvent(ctx.event)
  return { id: idOf(classId, U) }
}

export function getListTokenEvent(ctx: Context): ListTokenEvent {
  const event = events.itemPriceSet

  if (event.v9270.is(ctx)) {
    const { collection: classId, item: instanceId, price } = event.v9270.decode(ctx)
    return { collectionId: idOf(classId, U), sn: instanceId.toString(), price }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, item: instanceId, price } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: idOf(classId, U), sn: instanceId.toString(), price }
}

export function getUnListTokenEvent(ctx: Context): ListTokenEvent {
  const event = events.itemPriceRemoved

  if (event.v9270.is(ctx)) {
    const { collection: classId, item: instanceId } = event.v9270.decode(ctx)
    return { collectionId: idOf(classId, U), sn: instanceId.toString(), price: 0n }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, item: instanceId, price } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: idOf(classId, U), sn: instanceId.toString(), price: 0n }
}

export function getPriceTokenEvent(ctx: Context): ListTokenEvent {
  if (ctx.event.name === Event.setPrice) {
    return getListToken
  }

  return getUnListToken
}

export function getBuyTokenEvent(ctx: Context): BuyTokenEvent {
  const event = events.itemBought

  if (event.v9270.is(ctx)) {
    const { collection: classId, item: instanceId, price, seller, buyer } = event.v9270.decode(ctx)
    return {
      collectionId: idOf(classId, U),
      caller: addressOf(buyer),
      sn: instanceId.toString(),
      price: BigInt(price ?? 0),
      currentOwner: addressOf(seller),
    }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, item: instanceId, price, seller, buyer } = ctx._chain.decodeEvent(ctx.event)
  return {
    collectionId: idOf(classId, U),
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
    return { id: idOf(classId, U), max }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, mamaxSupply: max } = ctx._chain.decodeEvent(ctx.event)
  return { id: idOf(classId, U), max }
}

export function getChangeCollectionOwnerEvent(ctx: Context): ChangeCollectionOwnerEvent {
  const event = events.ownerChanged
  if (event.v1.is(ctx)) {
    const [classId, newOwner] = event.v1.decode(ctx)
    return { id: idOf(classId, U), owner: addressOf(newOwner) }
  }
  if (event.v700.is(ctx)) {
    const { class: classId, newOwner } = event.v700.decode(ctx)
    return { id: idOf(classId, U), owner: addressOf(newOwner) }
  }
  if (event.v9230.is(ctx)) {
    const { collection: classId, newOwner } = event.v9230.decode(ctx)
    return { id: idOf(classId, U), owner: addressOf(newOwner) }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, newOwner } = ctx._chain.decodeEvent(ctx.event)
  return { id: idOf(classId, U), owner: addressOf(newOwner) }
}

export function getClearCollectionMetadataEvent(ctx: Context): SetMetadata {
  const event = events.collectionMetadataCleared
  if (event.v9230.is(ctx)) {
    const { collection: classId } = event.v9230.decode(ctx)
    return { collectionId: idOf(classId, U) }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: idOf(classId, U) }
}

export function getCreateCollectionMetadataEvent(ctx: Context): SetMetadata {
  const event = events.collectionMetadataSet
  if (event.v9230.is(ctx)) {
    const { collection: classId, data, isFrozen } = event.v9230.decode(ctx)
    return { collectionId: idOf(classId, U), metadata: data.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { class: classId, data, isFrozen } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: idOf(classId, U), metadata: data.toString() }
}

export function getClearClassMetadataEvent(ctx: Context): SetMetadata {
  const event = events.classMetadataCleared
  if (event.v1.is(ctx)) {
    const classId = event.v1.decode(ctx)
    return { collectionId: idOf(classId, U) }
  }
  if (event.v700.is(ctx)) {
    const { class: classId } = event.v700.decode(ctx)
    return { collectionId: idOf(classId, U) }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { class: classId } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: idOf(classId, U) }
}

export function getCreateClassMetadataEvent(ctx: Context): SetMetadata {
  const event = events.classMetadataSet
  if (event.v1.is(ctx)) {
    const [classId, data, isFrozen] = event.v1.decode(ctx)
    return { collectionId: idOf(classId, U), metadata: data.toString() }
  }
  if (event.v700.is(ctx)) {
    const { class: classId, data, isFrozen } = event.v700.decode(ctx)
    return { collectionId: idOf(classId, U), metadata: data.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { class: classId, data, isFrozen } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: idOf(classId, U), metadata: data.toString() }
}

export function getCreateMetadataEvent(ctx: Context): SetMetadata {
  const event = events.metadataSet
  if (event.v1.is(ctx)) {
    const [classId, instanceId, data, isFrozen] = event.v1.decode(ctx)
    return { collectionId: idOf(classId, U), sn: instanceId.toString(), metadata: data.toString() }
  }
  if (event.v700.is(ctx)) {
    const { class: classId, instance: instanceId, data, isFrozen } = event.v700.decode(ctx)
    return { collectionId: idOf(classId, U), sn: instanceId.toString(), metadata: data.toString() }
  }
  if (event.v9230.is(ctx)) {
    const { collection: classId, item: instanceId, data, isFrozen } = event.v9230.decode(ctx)
    return { collectionId: idOf(classId, U), sn: instanceId.toString(), metadata: data.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, item: instanceId, data, isFrozen } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: idOf(classId, U), sn: instanceId.toString(), metadata: data.toString() }
}

export function getClearMetadataEvent(ctx: Context): SetMetadata {
  const event = events.metadataCleared
  if (event.v1.is(ctx)) {
    const [classId, instanceId] = event.v1.decode(ctx)
    return { collectionId: idOf(classId, U), sn: instanceId.toString() }
  }
  if (event.v700.is(ctx)) {
    const { class: classId, instance: instanceId } = event.v700.decode(ctx)
    return { collectionId: idOf(classId, U), sn: instanceId.toString() }
  }
  if (event.v9230.is(ctx)) {
    const { collection: classId, item: instanceId } = event.v9230.decode(ctx)
    return { collectionId: idOf(classId, U), sn: instanceId.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, item: instanceId } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: idOf(classId, U), sn: instanceId.toString() }
}

export function getMetadataEvent(ctx: Context): SetMetadata {
  switch (ctx.event.name) {
    case Event.clearClassMetadata:
      return getClearClassMetadataEvent(ctx)
    case Event.setClassMetadata:
      return getCreateClassMetadataEvent(ctx)
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
  if (event.v1.is(ctx)) {
    const [classId, instanceId, key, value] = event.v1.decode(ctx)
    return {
      collectionId: idOf(classId, U),
      sn: instanceId?.toString(),
      trait: key.toString(),
      value: value.toString(),
    }
  }
  if (event.v700.is(ctx)) {
    const { class: classId, maybeInstance: instanceId, key, value } = event.v700.decode(ctx)
    return {
      collectionId: idOf(classId, U),
      sn: instanceId?.toString(),
      trait: key.toString(),
      value: value.toString(),
    }
  }
  if (event.v9230.is(ctx)) {
    const { collection: classId, maybeItem: instanceId, key, value } = event.v9230.decode(ctx)
    return {
      collectionId: idOf(classId, U),
      sn: instanceId?.toString(),
      trait: key.toString(),
      value: value.toString(),
    }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, maybeItem: instanceId, key, value } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: idOf(classId, U), sn: instanceId?.toString(), trait: key.toString(), value: value.toString() }
}

function getClearAttributeEvent(ctx: Context): SetAttribute {
  const event = events.attributeCleared

  if (event.v1.is(ctx)) {
    const [classId, instanceId, key] = event.v1.decode(ctx)
    return { collectionId: idOf(classId, U), sn: instanceId?.toString(), trait: key.toString() }
  }
  if (event.v700.is(ctx)) {
    const { class: classId, maybeInstance: instanceId, key } = event.v700.decode(ctx)
    return { collectionId: idOf(classId, U), sn: instanceId?.toString(), trait: key.toString() }
  }
  if (event.v9230.is(ctx)) {
    const { collection: classId, maybeItem: instanceId, key } = event.v9230.decode(ctx)
    return { collectionId: idOf(classId, U), sn: instanceId?.toString(), trait: key.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, maybeItem: instanceId, key } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: idOf(classId, U), sn: instanceId?.toString(), trait: key.toString() }
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
  if (event.v1.is(ctx)) {
    const [classId, issuer, admin, freezer] = event.v1.decode(ctx)
    return { id: idOf(classId, U), issuer: addressOf(issuer), admin: addressOf(admin), freezer: addressOf(freezer) }
  }
  if (event.v700.is(ctx)) {
    const { class: classId, issuer, admin, freezer } = event.v700.decode(ctx)
    return { id: idOf(classId, U), issuer: addressOf(issuer), admin: addressOf(admin), freezer: addressOf(freezer) }
  }
  if (event.v9230.is(ctx)) {
    const { collection: classId, issuer, admin, freezer } = event.v9230.decode(ctx)
    return { id: idOf(classId, U), issuer: addressOf(issuer), admin: addressOf(admin), freezer: addressOf(freezer) }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, issuer, admin, freezer } = ctx._chain.decodeEvent(ctx.event)
  return { id: idOf(classId, U), issuer: addressOf(issuer), admin: addressOf(admin), freezer: addressOf(freezer) }
}
