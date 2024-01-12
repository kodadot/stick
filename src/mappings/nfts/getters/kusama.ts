import { NonFungible } from '../../../processable'
import { nfts as events } from '../../../types/kusama/events'
import { addressOf } from '../../utils/helper'
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

export function getCreateCollectionEvent(ctx: Event): CreateCollectionEvent {
  const event = events.created

  if (event.v9420.is(ctx)) {
    const { collection: classId, creator, owner } = event.v9420.decode(ctx)
    return { id: classId.toString(), caller: addressOf(creator), owner: addressOf(owner) }
  }
  
  const { collection: classId, creator, owner } = event.v9420.decode(ctx)
  return { id: classId.toString(), caller: addressOf(creator), owner: addressOf(owner) }
}

export function getForceCreateCollectionEvent(ctx: Event): ForceCreateCollectionEvent {
  const event = events.forceCreated

  if (event.v9420.is(ctx)) {
    const { collection: classId, owner } = event.v9420.decode(ctx)
    return { id: classId.toString(), owner: addressOf(owner) }
  }
  
  const { collection: classId, owner } = event.v9420.decode(ctx)
  return { id: classId.toString(), owner: addressOf(owner) }
}

export function getCreateTokenEvent(ctx: Event): CreateTokenEvent {
  const event = events.issued

  if (event.v9420.is(ctx)) {
    const { collection: classId, item: instanceId, owner } = event.v9420.decode(ctx)
    return { collectionId: classId.toString(), owner: addressOf(owner), sn: instanceId.toString() }
  }
  
  const { collection: classId, item: instanceId, owner } = event.v9420.decode(ctx)
  return { collectionId: classId.toString(), owner: addressOf(owner), sn: instanceId.toString() }
}

export function getTransferTokenEvent(ctx: Event): TransferTokenEvent {
  const event = events.transferred

  if (event.v9420.is(ctx)) {
    const { collection: classId, item: instanceId, from, to } = event.v9420.decode(ctx)
    return { collectionId: classId.toString(), caller: addressOf(from), sn: instanceId.toString(), to: addressOf(to) }
  }
  
  const { collection: classId, item: instanceId, from, to } = event.v9420.decode(ctx)
  return { collectionId: classId.toString(), caller: addressOf(from), sn: instanceId.toString(), to: addressOf(to) }
}

export function getBurnTokenEvent(ctx: Event): BurnTokenEvent {
  const event = events.burned

  if (event.v9420.is(ctx)) {
    const { collection: classId, item: instanceId, owner } = event.v9420.decode(ctx)
    return { collectionId: classId.toString(), owner: addressOf(owner), sn: instanceId.toString() }
  }
  
  const { collection: classId, item: instanceId, owner } = event.v9420.decode(ctx)
  return { collectionId: classId.toString(), owner: addressOf(owner), sn: instanceId.toString() }
}

export function getDestroyCollectionEvent(ctx: Event): DestroyCollectionEvent {
  const event = events.destroyed

  if (event.v9420.is(ctx)) {
    const { collection: classId } = event.v9420.decode(ctx)
    return { id: classId.toString() }
  }

  
  const { collection: classId } = event.v9420.decode(ctx)
  return { id: classId.toString() }
}

export function getListTokenEvent(ctx: Event): ListTokenEvent {
  const event = events.itemPriceSet

  if (event.v9420.is(ctx)) {
    const { collection: classId, item: instanceId, price } = event.v9420.decode(ctx)
    return { collectionId: classId.toString(), sn: instanceId.toString(), price }
  }

  
  const { collection: classId, item: instanceId, price } = event.v9420.decode(ctx)
  return { collectionId: classId.toString(), sn: instanceId.toString(), price }
}

export function getUnListTokenEvent(ctx: Event): ListTokenEvent {
  const event = events.itemPriceRemoved

  if (event.v9420.is(ctx)) {
    const { collection: classId, item: instanceId } = event.v9420.decode(ctx)
    return { collectionId: classId.toString(), sn: instanceId.toString(), price: 0n }
  }

  
  const { collection: classId, item: instanceId } = event.v9420.decode(ctx)
  return { collectionId: classId.toString(), sn: instanceId.toString(), price: 0n }
}

export function getPriceTokenEvent(ctx: Event): ListTokenEvent {
  if (ctx.name === NonFungible.setPrice) {
    return getListTokenEvent(ctx)
  }

  return getUnListTokenEvent(ctx)
}

export function getBuyTokenEvent(ctx: Event): BuyTokenEvent {
  const event = events.itemBought

  if (event.v9420.is(ctx)) {
    const { collection: classId, item: instanceId, price, seller, buyer } = event.v9420.decode(ctx)
    return {
      collectionId: classId.toString(),
      caller: addressOf(buyer),
      sn: instanceId.toString(),
      price: BigInt(price ?? 0),
      currentOwner: addressOf(seller),
    }
  }
  
  const { collection: classId, item: instanceId, price, seller, buyer } = event.v9420.decode(ctx)
  return {
    collectionId: classId.toString(),
    caller: addressOf(buyer),
    sn: instanceId.toString(),
    price: BigInt(price ?? 0),
    currentOwner: addressOf(seller),
  }
}

export function getLockCollectionEvent(ctx: Event): LockCollectionEvent {
  const event = events.collectionMaxSupplySet
  if (event.v9420.is(ctx)) {
    const { collection: classId, maxSupply: max } = event.v9420.decode(ctx)
    return { id: classId.toString(), max }
  }
  
  const { collection: classId, maxSupply: max } = event.v9420.decode(ctx)
  return { id: classId.toString(), max }
}

export function getChangeCollectionOwnerEvent(ctx: Event): ChangeCollectionOwnerEvent {
  const event = events.ownerChanged

  if (event.v9420.is(ctx)) {
    const { collection: classId, newOwner } = event.v9420.decode(ctx)
    return { id: classId.toString(), owner: addressOf(newOwner) }
  }

  
  const { collection: classId, newOwner } = event.v9420.decode(ctx)
  return { id: classId.toString(), owner: addressOf(newOwner) }
}

export function getClearCollectionMetadataEvent(ctx: Event): SetMetadata {
  const event = events.collectionMetadataCleared

  if (event.v9420.is(ctx)) {
    const { collection: classId } = event.v9420.decode(ctx)
    return { collectionId: classId.toString() }
  }

  
  const { collection: classId } = event.v9420.decode(ctx)
  return { collectionId: classId.toString() }
}

export function getCreateCollectionMetadataEvent(ctx: Event): SetMetadata {
  const event = events.collectionMetadataSet

  if (event.v9420.is(ctx)) {
    const { collection: classId, data } = event.v9420.decode(ctx)
    return { collectionId: classId.toString(), metadata: data.toString() }
  }

  
  const { collection: classId, data } = event.v9420.decode(ctx)
  return { collectionId: classId.toString(), metadata: data.toString() }
}

export function getClearClassMetadataEvent(ctx: Event): SetMetadata {
  const event = events.collectionMetadataSet

  if (event.v9420.is(ctx)) {
    const { collection: classId, data } = event.v9420.decode(ctx)
    return { collectionId: classId.toString() }
  }

  
  const { collection: classId } = event.v9420.decode(ctx)
  return { collectionId: classId.toString() }
}

export function getCreateClassMetadataEvent(ctx: Event): SetMetadata {
  const event = events.collectionMetadataSet

  if (event.v9420.is(ctx)) {
    const { collection: classId, data } = event.v9420.decode(ctx)
    return { collectionId: classId.toString(), metadata: data.toString() }
  }

  
  const { collection: classId, data } = event.v9420.decode(ctx)
  return { collectionId: classId.toString(), metadata: data.toString() }
}

export function getCreateMetadataEvent(ctx: Event): SetMetadata {
  const event = events.itemMetadataSet

  if (event.v9420.is(ctx)) {
    const { collection: classId, item: instanceId, data } = event.v9420.decode(ctx)
    return { collectionId: classId.toString(), sn: instanceId.toString(), metadata: data.toString() }
  }

  
  const { collection: classId, item: instanceId, data } = event.v9420.decode(ctx)
  return { collectionId: classId.toString(), sn: instanceId.toString(), metadata: data.toString() }
}

export function getClearMetadataEvent(ctx: Event): SetMetadata {
  const event = events.itemMetadataCleared

  if (event.v9420.is(ctx)) {
    const { collection: classId, item: instanceId } = event.v9420.decode(ctx)
    return { collectionId: classId.toString(), sn: instanceId.toString() }
  }

  
  const { collection: classId, item: instanceId } = event.v9420.decode(ctx)
  return { collectionId: classId.toString(), sn: instanceId.toString() }
}

export function getMetadataEvent(ctx: Event): SetMetadata {
  switch (ctx.name) {
    case NonFungible.setCollectionMetadata:
      return getCreateCollectionMetadataEvent(ctx)
    case NonFungible.clearCollectionMetadata:
      return getClearCollectionMetadataEvent(ctx)
    case NonFungible.setMetadata:
      return getCreateMetadataEvent(ctx)
    case NonFungible.clearMetadata:
      return getClearMetadataEvent(ctx)
    default:
      throw new Error('Unsupported event')
  }
}

function getSetAttributeEvent(ctx: Event): SetAttribute {
  const event = events.attributeSet
  if (event.v9420.is(ctx)) {
    const { collection: classId, maybeItem: instanceId, key, value } = event.v9420.decode(ctx)
    return {
      collectionId: classId.toString(),
      sn: instanceId?.toString(),
      trait: key.toString(),
      value: value.toString(),
    }
  }

  
  const { collection: classId, maybeItem: instanceId, key, value } = event.v9420.decode(ctx)
  return {
    collectionId: classId.toString(),
    sn: instanceId?.toString(),
    trait: key.toString(),
    value: value.toString(),
  }
}

function getClearAttributeEvent(ctx: Event): SetAttribute {
  const event = events.attributeCleared

  if (event.v9420.is(ctx)) {
    const { collection: classId, maybeItem: instanceId, key } = event.v9420.decode(ctx)
    return { collectionId: classId.toString(), sn: instanceId?.toString(), trait: key.toString() }
  }

  
  const { collection: classId, maybeItem: instanceId, key } = event.v9420.decode(ctx)
  return { collectionId: classId.toString(), sn: instanceId?.toString(), trait: key.toString() }
}

export function getAttributeEvent(ctx: Event): SetAttribute {
  switch (ctx.name) {
    case NonFungible.setAttribute:
      return getSetAttributeEvent(ctx)
    case NonFungible.clearAttribute:
      return getClearAttributeEvent(ctx)
    default:
      throw new Error('Unsupported event')
  }
}

export function getChangeTeamEvent(ctx: Event): ChangeCollectionTeam {
  const event = events.teamChanged

  if (event.v9420.is(ctx)) {
    const { collection: classId, issuer, admin, freezer } = event.v9420.decode(ctx)
    return {
      id: classId.toString(),
      issuer: issuer ? addressOf(issuer) : '',
      admin: admin ? addressOf(admin) : '',
      freezer: freezer ? addressOf(freezer) : '',
    }
  }

  
  const { collection: classId, issuer, admin, freezer } = event.v9420.decode(ctx)
  return {
    id: classId.toString(),
    issuer: issuer ? addressOf(issuer) : '',
    admin: admin ? addressOf(admin) : '',
    freezer: freezer ? addressOf(freezer) : '',
  }
}
