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
  const event = events.Created
  if (event.isV1) {
    const [classId, creator, owner] = event.asV1
    return { id: idOf(classId, U), caller: addressOf(creator), owner: addressOf(owner) }
  }
  if (event.isV700) {
    const { class: classId, creator, owner } = event.asV700
    return { id: idOf(classId, U), caller: addressOf(creator), owner: addressOf(owner) }
  }
  if (event.isV9230) {
    const { collection: classId, creator, owner } = event.asV9230
    return { id: idOf(classId, U), caller: addressOf(creator), owner: addressOf(owner) }
  }
  warn(Interaction.CREATE, 'USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, creator, owner } = ctx._chain.decodeEvent(ctx.event)
  return { id: idOf(classId, U), caller: addressOf(creator), owner: addressOf(owner) }
}

export function getForceCreateCollectionEvent(ctx: Context): ForceCreateCollectionEvent {
  const event = events.ForceCreated
  if (event.isV1) {
    const [classId, owner] = event.asV1
    return { id: idOf(classId, U), owner: addressOf(owner) }
  }
  if (event.isV700) {
    const { class: classId, owner } = event.asV700
    return { id: idOf(classId, U), owner: addressOf(owner) }
  }
  if (event.isV9230) {
    const { collection: classId, owner } = event.asV9230
    return { id: idOf(classId, U), owner: addressOf(owner) }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, owner } = ctx._chain.decodeEvent(ctx.event)
  return { id: idOf(classId, U), owner: addressOf(owner) }
}

export function getCreateTokenEvent(ctx: Context): CreateTokenEvent {
  const event = events.Issued
  if (event.isV1) {
    const [classId, instanceId, owner] = event.asV1
    return { collectionId: idOf(classId, U), owner: addressOf(owner), sn: instanceId.toString() }
  }
  if (event.isV700) {
    const { class: classId, instance: instanceId, owner } = event.asV700
    return { collectionId: idOf(classId, U), owner: addressOf(owner), sn: instanceId.toString() }
  }
  if (event.isV9230) {
    const { collection: classId, item: instanceId, owner } = event.asV9230
    return { collectionId: idOf(classId, U), owner: addressOf(owner), sn: instanceId.toString() }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, item: instanceId, owner } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: idOf(classId, U), owner: addressOf(owner), sn: instanceId.toString() }
}

export function getTransferTokenEvent(ctx: Context): TransferTokenEvent {
  const event = events.Transferred
  if (event.isV1) {
    const [classId, instanceId, from, to] = event.asV1
    return { collectionId: idOf(classId, U), caller: addressOf(from), sn: instanceId.toString(), to: addressOf(to) }
  }
  if (event.isV700) {
    const { class: classId, instance: instanceId, from, to } = event.asV700
    return { collectionId: idOf(classId, U), caller: addressOf(from), sn: instanceId.toString(), to: addressOf(to) }
  }
  if (event.isV9230) {
    const { collection: classId, item: instanceId, from, to } = event.asV9230
    return { collectionId: idOf(classId, U), caller: addressOf(from), sn: instanceId.toString(), to: addressOf(to) }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, item: instanceId, from, to } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: idOf(classId, U), caller: addressOf(from), sn: instanceId.toString(), to: addressOf(to) }
}

export function getBurnTokenEvent(ctx: Context): BurnTokenEvent {
  const event = events.Burned
  if (event.isV1) {
    const [classId, instanceId, owner] = event.asV1
    return { collectionId: idOf(classId, U), owner: addressOf(owner), sn: instanceId.toString() }
  }
  if (event.isV700) {
    const { class: classId, instance: instanceId, owner } = event.asV700
    return { collectionId: idOf(classId, U), owner: addressOf(owner), sn: instanceId.toString() }
  }
  if (event.isV9230) {
    const { collection: classId, item: instanceId, owner } = event.asV9230
    return { collectionId: idOf(classId, U), owner: addressOf(owner), sn: instanceId.toString() }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, item: instanceId, owner } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: idOf(classId, U), owner: addressOf(owner), sn: instanceId.toString() }
}

export function getDestroyCollectionEvent(ctx: Context): DestroyCollectionEvent {
  const event = events.Destroyed
  if (event.isV1) {
    const classId = event.asV1
    return { id: idOf(classId, U) }
  }
  if (event.isV700) {
    const { class: classId } = event.asV700
    return { id: idOf(classId, U) }
  }
  if (event.isV9230) {
    const { collection: classId } = event.asV9230
    return { id: idOf(classId, U) }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId } = ctx._chain.decodeEvent(ctx.event)
  return { id: idOf(classId, U) }
}

export function getListTokenEvent(ctx: Context): ListTokenEvent {
  const event = events.ItemPriceSet

  if (event.isV9270) {
    const { collection: classId, item: instanceId, price } = event.asV9270
    return { collectionId: idOf(classId, U), sn: instanceId.toString(), price }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, item: instanceId, price } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: idOf(classId, U), sn: instanceId.toString(), price }
}

export function getUnListTokenEvent(ctx: Context): ListTokenEvent {
  const event = events.ItemPriceRemoved

  if (event.isV9270) {
    const { collection: classId, item: instanceId } = event.asV9270
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
  const event = events.ItemBought

  if (event.isV9270) {
    const { collection: classId, item: instanceId, price, seller, buyer } = event.asV9270
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
  const event = events.CollectionMaxSupplySet
  if (event.isV9230) {
    const { collection: classId, maxSupply: max } = event.asV9230
    return { id: idOf(classId, U), max }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, mamaxSupply: max } = ctx._chain.decodeEvent(ctx.event)
  return { id: idOf(classId, U), max }
}

export function getChangeCollectionOwnerEvent(ctx: Context): ChangeCollectionOwnerEvent {
  const event = events.OwnerChanged
  if (event.isV1) {
    const [classId, newOwner] = event.asV1
    return { id: idOf(classId, U), owner: addressOf(newOwner) }
  }
  if (event.isV700) {
    const { class: classId, newOwner } = event.asV700
    return { id: idOf(classId, U), owner: addressOf(newOwner) }
  }
  if (event.isV9230) {
    const { collection: classId, newOwner } = event.asV9230
    return { id: idOf(classId, U), owner: addressOf(newOwner) }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, newOwner } = ctx._chain.decodeEvent(ctx.event)
  return { id: idOf(classId, U), owner: addressOf(newOwner) }
}

export function getClearCollectionMetadataEvent(ctx: Context): SetMetadata {
  const event = events.CollectionMetadataCleared
  if (event.isV9230) {
    const { collection: classId } = event.asV9230
    return { collectionId: idOf(classId, U) }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: idOf(classId, U) }
}

export function getCreateCollectionMetadataEvent(ctx: Context): SetMetadata {
  const event = events.CollectionMetadataSet
  if (event.isV9230) {
    const { collection: classId, data, isFrozen } = event.asV9230
    return { collectionId: idOf(classId, U), metadata: data.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { class: classId, data, isFrozen } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: idOf(classId, U), metadata: data.toString() }
}

export function getClearClassMetadataEvent(ctx: Context): SetMetadata {
  const event = events.ClassMetadataCleared
  if (event.isV1) {
    const classId = event.asV1
    return { collectionId: idOf(classId, U) }
  }
  if (event.isV700) {
    const { class: classId } = event.asV700
    return { collectionId: idOf(classId, U) }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { class: classId } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: idOf(classId, U) }
}

export function getCreateClassMetadataEvent(ctx: Context): SetMetadata {
  const event = events.ClassMetadataSet
  if (event.isV1) {
    const [classId, data, isFrozen] = event.asV1
    return { collectionId: idOf(classId, U), metadata: data.toString() }
  }
  if (event.isV700) {
    const { class: classId, data, isFrozen } = event.asV700
    return { collectionId: idOf(classId, U), metadata: data.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { class: classId, data, isFrozen } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: idOf(classId, U), metadata: data.toString() }
}

export function getCreateMetadataEvent(ctx: Context): SetMetadata {
  const event = events.MetadataSet
  if (event.isV1) {
    const [classId, instanceId, data, isFrozen] = event.asV1
    return { collectionId: idOf(classId, U), sn: instanceId.toString(), metadata: data.toString() }
  }
  if (event.isV700) {
    const { class: classId, instance: instanceId, data, isFrozen } = event.asV700
    return { collectionId: idOf(classId, U), sn: instanceId.toString(), metadata: data.toString() }
  }
  if (event.isV9230) {
    const { collection: classId, item: instanceId, data, isFrozen } = event.asV9230
    return { collectionId: idOf(classId, U), sn: instanceId.toString(), metadata: data.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, item: instanceId, data, isFrozen } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: idOf(classId, U), sn: instanceId.toString(), metadata: data.toString() }
}

export function getClearMetadataEvent(ctx: Context): SetMetadata {
  const event = events.MetadataCleared
  if (event.isV1) {
    const [classId, instanceId] = event.asV1
    return { collectionId: idOf(classId, U), sn: instanceId.toString() }
  }
  if (event.isV700) {
    const { class: classId, instance: instanceId } = event.asV700
    return { collectionId: idOf(classId, U), sn: instanceId.toString() }
  }
  if (event.isV9230) {
    const { collection: classId, item: instanceId } = event.asV9230
    return { collectionId: idOf(classId, U), sn: instanceId.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, item: instanceId } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: idOf(classId, U), sn: instanceId.toString() }
}

export function getMetadataEvent(ctx: Context): SetMetadata {
  switch (ctx.event.name) {
    case Event.clearClassMetadata:
      return getClearClassMetadata
    case Event.setClassMetadata:
      return getCreateClassMetadata
    case Event.setCollectionMetadata:
      return getCreateCollectionMetadata
    case Event.clearCollectionMetadata:
      return getClearCollectionMetadata
    case Event.setMetadata:
      return getCreateMetadata
    case Event.clearMetadata:
      return getClearMetadata
    default:
      throw new Error('Unsupported event')
  }
}

function getSetAttributeEvent(ctx: Context): SetAttribute {
  const event = events.AttributeSet
  if (event.isV1) {
    const [classId, instanceId, key, value] = event.asV1
    return {
      collectionId: idOf(classId, U),
      sn: instanceId?.toString(),
      trait: key.toString(),
      value: value.toString(),
    }
  }
  if (event.isV700) {
    const { class: classId, maybeInstance: instanceId, key, value } = event.asV700
    return {
      collectionId: idOf(classId, U),
      sn: instanceId?.toString(),
      trait: key.toString(),
      value: value.toString(),
    }
  }
  if (event.isV9230) {
    const { collection: classId, maybeItem: instanceId, key, value } = event.asV9230
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
  const event = events.AttributeCleared

  if (event.isV1) {
    const [classId, instanceId, key] = event.asV1
    return { collectionId: idOf(classId, U), sn: instanceId?.toString(), trait: key.toString() }
  }
  if (event.isV700) {
    const { class: classId, maybeInstance: instanceId, key } = event.asV700
    return { collectionId: idOf(classId, U), sn: instanceId?.toString(), trait: key.toString() }
  }
  if (event.isV9230) {
    const { collection: classId, maybeItem: instanceId, key } = event.asV9230
    return { collectionId: idOf(classId, U), sn: instanceId?.toString(), trait: key.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, maybeItem: instanceId, key } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: idOf(classId, U), sn: instanceId?.toString(), trait: key.toString() }
}

export function getAttributeEvent(ctx: Context): SetAttribute {
  switch (ctx.event.name) {
    case Event.setAttribute:
      return getSetAttribute
    case Event.clearAttribute:
      return getClearAttribute
    default:
      throw new Error('Unsupported event')
  }
}

export function getChangeTeamEvent(ctx: Context): ChangeCollectionTeam {
  const event = events.TeamChanged
  if (event.isV1) {
    const [classId, issuer, admin, freezer] = event.asV1
    return { id: idOf(classId, U), issuer: addressOf(issuer), admin: addressOf(admin), freezer: addressOf(freezer) }
  }
  if (event.isV700) {
    const { class: classId, issuer, admin, freezer } = event.asV700
    return { id: idOf(classId, U), issuer: addressOf(issuer), admin: addressOf(admin), freezer: addressOf(freezer) }
  }
  if (event.isV9230) {
    const { collection: classId, issuer, admin, freezer } = event.asV9230
    return { id: idOf(classId, U), issuer: addressOf(issuer), admin: addressOf(admin), freezer: addressOf(freezer) }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, issuer, admin, freezer } = ctx._chain.decodeEvent(ctx.event)
  return { id: idOf(classId, U), issuer: addressOf(issuer), admin: addressOf(admin), freezer: addressOf(freezer) }
}
