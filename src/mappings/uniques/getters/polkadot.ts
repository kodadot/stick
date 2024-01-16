import { Interaction } from '../../../model'
import { uniques as events } from '../../../types/polkadot/events'
import { addressOf, idOf, UNIQUE_PREFIX as U, unHex } from '../../utils/helper'
import { warn } from '../../utils/logger'
import { Event } from '../../utils/types'
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
import { Unique } from '../../../processable'


export function getCreateCollectionEvent(ctx: Event): CreateCollectionEvent {
  const event = events.created
  if (event.v601.is(ctx)) {
    const [classId, creator, owner] = event.v601.decode(ctx)
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
  const { collection: classId, creator, owner } = event.v9230.decode(ctx)
  return { id: idOf(classId, U), caller: addressOf(creator), owner: addressOf(owner) }
}

export function getForceCreateCollectionEvent(ctx: Event): ForceCreateCollectionEvent {
  const event = events.forceCreated
  if (event.v601.is(ctx)) {
    const [classId, owner] = event.v601.decode(ctx)
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
  
  const { collection: classId, owner } = event.v9230.decode(ctx)
  return { id: idOf(classId, U), owner: addressOf(owner) }
}

export function getCreateTokenEvent(ctx: Event): CreateTokenEvent {
  const event = events.issued
  if (event.v601.is(ctx)) {
    const [classId, instanceId, owner] = event.v601.decode(ctx)
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
  
  const { collection: classId, item: instanceId, owner } = event.v9230.decode(ctx)
  return { collectionId: idOf(classId, U), owner: addressOf(owner), sn: instanceId.toString() }
}

export function getTransferTokenEvent(ctx: Event): TransferTokenEvent {
  const event = events.transferred
  if (event.v601.is(ctx)) {
    const [classId, instanceId, from, to] = event.v601.decode(ctx)
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
  
  const { collection: classId, item: instanceId, from, to } = event.v9230.decode(ctx)
  return { collectionId: idOf(classId, U), caller: addressOf(from), sn: instanceId.toString(), to: addressOf(to) }
}

export function getBurnTokenEvent(ctx: Event): BurnTokenEvent {
  const event = events.burned
  if (event.v601.is(ctx)) {
    const [classId, instanceId, owner] = event.v601.decode(ctx)
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
  
  const { collection: classId, item: instanceId, owner } = event.v9230.decode(ctx)
  return { collectionId: idOf(classId, U), owner: addressOf(owner), sn: instanceId.toString() }
}

export function getDestroyCollectionEvent(ctx: Event): DestroyCollectionEvent {
  const event = events.destroyed
  if (event.v601.is(ctx)) {
    const classId = event.v601.decode(ctx)
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

  
  const { collection: classId } = event.v9230.decode(ctx)
  return { id: idOf(classId, U) }
}

export function getListTokenEvent(ctx: Event): ListTokenEvent {
  const event = events.itemPriceSet

  if (event.v9270.is(ctx)) {
    const { collection: classId, item: instanceId, price } = event.v9270.decode(ctx)
    return { collectionId: idOf(classId, U), sn: instanceId.toString(), price }
  }

  
  const { collection: classId, item: instanceId, price } = event.v9270.decode(ctx)
  return { collectionId: idOf(classId, U), sn: instanceId.toString(), price }
}

export function getUnListTokenEvent(ctx: Event): ListTokenEvent {
  const event = events.itemPriceRemoved

  if (event.v9270.is(ctx)) {
    const { collection: classId, item: instanceId } = event.v9270.decode(ctx)
    return { collectionId: idOf(classId, U), sn: instanceId.toString(), price: 0n }
  }

  
  const { collection: classId, item: instanceId } = event.v9270.decode(ctx)
  return { collectionId: idOf(classId, U), sn: instanceId.toString(), price: 0n }
}

export function getPriceTokenEvent(ctx: Event): ListTokenEvent {
  if (ctx.name === Unique.setPrice) {
    return getListTokenEvent(ctx)
  }

  return getUnListTokenEvent(ctx)
}

export function getBuyTokenEvent(ctx: Event): BuyTokenEvent {
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
  
  const { collection: classId, item: instanceId, price, seller, buyer } = event.v9270.decode(ctx)
  return {
    collectionId: idOf(classId, U),
    caller: addressOf(buyer),
    sn: instanceId.toString(),
    price: BigInt(price ?? 0),
    currentOwner: addressOf(seller),
  }
}

export function getLockCollectionEvent(ctx: Event): LockCollectionEvent {
  const event = events.collectionMaxSupplySet
  if (event.v9230.is(ctx)) {
    const { collection: classId, maxSupply: max } = event.v9230.decode(ctx)
    return { id: idOf(classId, U), max }
  }
  
  const { collection: classId, maxSupply: max } = event.v9230.decode(ctx)
  return { id: idOf(classId, U), max }
}

export function getChangeCollectionOwnerEvent(ctx: Event): ChangeCollectionOwnerEvent {
  const event = events.ownerChanged
  if (event.v601.is(ctx)) {
    const [classId, newOwner] = event.v601.decode(ctx)
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

  
  const { collection: classId, newOwner } = event.v9230.decode(ctx)
  return { id: idOf(classId, U), owner: addressOf(newOwner) }
}

export function getClearCollectionMetadataEvent(ctx: Event): SetMetadata {
  const event = events.collectionMetadataCleared
  if (event.v9230.is(ctx)) {
    const { collection: classId } = event.v9230.decode(ctx)
    return { collectionId: idOf(classId, U) }
  }
  
  const { collection: classId } = event.v9230.decode(ctx)
  return { collectionId: idOf(classId, U) }
}

export function getCreateCollectionMetadataEvent(ctx: Event): SetMetadata {
  const event = events.collectionMetadataSet
  if (event.v9230.is(ctx)) {
    const { collection: classId, data, isFrozen } = event.v9230.decode(ctx)
    return { collectionId: idOf(classId, U), metadata: unHex(data) }
  }

  
  const { collection: classId, data, isFrozen } = event.v9230.decode(ctx)
  return { collectionId: idOf(classId, U), metadata: unHex(data) }
}

export function getClearClassMetadataEvent(ctx: Event): SetMetadata {
  const event = events.classMetadataCleared
  if (event.v601.is(ctx)) {
    const classId = event.v601.decode(ctx)
    return { collectionId: idOf(classId, U) }
  }
  if (event.v700.is(ctx)) {
    const { class: classId } = event.v700.decode(ctx)
    return { collectionId: idOf(classId, U) }
  }

  
  const { class: classId } = event.v700.decode(ctx)
  return { collectionId: idOf(classId, U) }
}

export function getCreateClassMetadataEvent(ctx: Event): SetMetadata {
  const event = events.classMetadataSet
  if (event.v601.is(ctx)) {
    const [classId, data, isFrozen] = event.v601.decode(ctx)
    return { collectionId: idOf(classId, U), metadata: unHex(data) }
  }
  if (event.v700.is(ctx)) {
    const { class: classId, data, isFrozen } = event.v700.decode(ctx)
    return { collectionId: idOf(classId, U), metadata: unHex(data) }
  }

  
  const { class: classId, data, isFrozen } = event.v700.decode(ctx)
  return { collectionId: idOf(classId, U), metadata: unHex(data) }
}

export function getCreateMetadataEvent(ctx: Event): SetMetadata {
  const event = events.metadataSet
  if (event.v601.is(ctx)) {
    const [classId, instanceId, data, isFrozen] = event.v601.decode(ctx)
    return { collectionId: idOf(classId, U), sn: instanceId.toString(), metadata: unHex(data) }
  }
  if (event.v700.is(ctx)) {
    const { class: classId, instance: instanceId, data, isFrozen } = event.v700.decode(ctx)
    return { collectionId: idOf(classId, U), sn: instanceId.toString(), metadata: unHex(data) }
  }
  if (event.v9230.is(ctx)) {
    const { collection: classId, item: instanceId, data, isFrozen } = event.v9230.decode(ctx)
    return { collectionId: idOf(classId, U), sn: instanceId.toString(), metadata: unHex(data) }
  }

  
  const { collection: classId, item: instanceId, data, isFrozen } = event.v9230.decode(ctx)
  return { collectionId: idOf(classId, U), sn: instanceId.toString(), metadata: unHex(data) }
}

export function getClearMetadataEvent(ctx: Event): SetMetadata {
  const event = events.metadataCleared
  if (event.v601.is(ctx)) {
    const [classId, instanceId] = event.v601.decode(ctx)
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

  
  const { collection: classId, item: instanceId } = event.v9230.decode(ctx)
  return { collectionId: idOf(classId, U), sn: instanceId.toString() }
}

export function getMetadataEvent(ctx: Event): SetMetadata {
  switch (ctx.name) {
    case Unique.clearClassMetadata:
      return getClearClassMetadataEvent(ctx)
    case Unique.setClassMetadata:
      return getCreateClassMetadataEvent(ctx)
    case Unique.setCollectionMetadata:
      return getCreateCollectionMetadataEvent(ctx)
    case Unique.clearCollectionMetadata:
      return getClearCollectionMetadataEvent(ctx)
    case Unique.setMetadata:
      return getCreateMetadataEvent(ctx)
    case Unique.clearMetadata:
      return getClearMetadataEvent(ctx)
    default:
      throw new Error('Unsupported event')
  }
}

function getSetAttributeEvent(ctx: Event): SetAttribute {
  const event = events.attributeSet
  if (event.v601.is(ctx)) {
    const [classId, instanceId, key, value] = event.v601.decode(ctx)
    return {
      collectionId: idOf(classId, U),
      sn: instanceId?.toString(),
      trait: key.toString(),
      value,
    }
  }
  if (event.v700.is(ctx)) {
    const { class: classId, maybeInstance: instanceId, key, value } = event.v700.decode(ctx)
    return {
      collectionId: idOf(classId, U),
      sn: instanceId?.toString(),
      trait: key.toString(),
      value,
    }
  }
  if (event.v9230.is(ctx)) {
    const { collection: classId, maybeItem: instanceId, key, value } = event.v9230.decode(ctx)
    return {
      collectionId: idOf(classId, U),
      sn: instanceId?.toString(),
      trait: key.toString(),
      value,
    }
  }

  
  const { collection: classId, maybeItem: instanceId, key, value } = event.v9230.decode(ctx)
  return { collectionId: idOf(classId, U), sn: instanceId?.toString(), trait: key.toString(), value: unHex(value) }
}

function getClearAttributeEvent(ctx: Event): SetAttribute {
  const event = events.attributeCleared

  if (event.v601.is(ctx)) {
    const [classId, instanceId, key] = event.v601.decode(ctx)
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

  
  const { collection: classId, maybeItem: instanceId, key } = event.v9230.decode(ctx)
  return { collectionId: idOf(classId, U), sn: instanceId?.toString(), trait: key.toString() }
}

export function getAttributeEvent(ctx: Event): SetAttribute {
  switch (ctx.name) {
    case Unique.setAttribute:
      return getSetAttributeEvent(ctx)
    case Unique.clearAttribute:
      return getClearAttributeEvent(ctx)
    default:
      throw new Error('Unsupported event')
  }
}

export function getChangeTeamEvent(ctx: Event): ChangeCollectionTeam {
  const event = events.teamChanged
  if (event.v601.is(ctx)) {
    const [classId, issuer, admin, freezer] = event.v601.decode(ctx)
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

  const { collection: classId, issuer, admin, freezer } = event.v9230.decode(ctx)
  return { id: idOf(classId, U), issuer: addressOf(issuer), admin: addressOf(admin), freezer: addressOf(freezer) }
}
