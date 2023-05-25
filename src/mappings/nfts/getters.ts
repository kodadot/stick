
import { Interaction } from '../../model'
import { NonFungible as Event } from '../../processable'
import * as events from '../../types/statemine/events'
import { addressOf } from '../utils/helper'
import { warn } from '../utils/logger'
import { Context } from '../utils/types'
import { BurnTokenEvent, BuyTokenEvent, ChangeCollectionOwnerEvent, ChangeCollectionTeam, CreateCollectionEvent, CreateTokenEvent, DestroyCollectionEvent, ForceCreateCollectionEvent, ListTokenEvent, LockCollectionEvent, SetAttribute, SetMetadata, TransferTokenEvent } from './types'

export function getCreateCollectionEvent(ctx: Context): CreateCollectionEvent {
  const event = new events.NftsCreatedEvent(ctx)

  if (event.isV9420) {
    const { collection: classId, creator, owner } = event.asV9420
    return { id: classId.toString(), caller: addressOf(creator), owner: addressOf(owner) }
  }
  warn(Interaction.CREATE, 'USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const {
    collection: classId,
    creator,
    owner,
  } = ctx._chain.decodeEvent(ctx.event)
  return { id: classId.toString(), caller: addressOf(creator), owner: addressOf(owner) }
}

export function getForceCreateCollectionEvent(ctx: Context): ForceCreateCollectionEvent {
  const event = new events.NftsForceCreatedEvent(ctx)

  if (event.isV9420) {
    const { collection: classId, owner } = event.asV9420
    return { id: classId.toString(), owner: addressOf(owner) }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, owner } = ctx._chain.decodeEvent(ctx.event)
  return { id: classId.toString(), owner: addressOf(owner) }
}

export function getCreateTokenEvent(ctx: Context): CreateTokenEvent {
  const event = new events.NftsIssuedEvent(ctx)

  if (event.isV9420) {
    const { collection: classId, item: instanceId, owner } = event.asV9420
    return { collectionId: classId.toString(), owner: addressOf(owner), sn: instanceId.toString() }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const {
    collection: classId,
    item: instanceId,
    owner,
  } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: classId.toString(), owner: addressOf(owner), sn: instanceId.toString() }
}

export function getTransferTokenEvent(ctx: Context): TransferTokenEvent {
  const event = new events.NftsTransferredEvent(ctx)

  if (event.isV9420) {
    const { collection: classId, item: instanceId, from, to } = event.asV9420
    return { collectionId: classId.toString(), caller: addressOf(from), sn: instanceId.toString(), to: addressOf(to) }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const {
    collection: classId,
    item: instanceId,
    from,
    to,
  } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: classId.toString(), caller: addressOf(from), sn: instanceId.toString(), to: addressOf(to), }
}

export function getBurnTokenEvent(ctx: Context): BurnTokenEvent {
  const event = new events.NftsBurnedEvent(ctx)

  if (event.isV9420) {
    const { collection: classId, item: instanceId, owner } = event.asV9420
    return { collectionId: classId.toString(), owner: addressOf(owner), sn: instanceId.toString() }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const {
    collection: classId,
    item: instanceId,
    owner,
  } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: classId.toString(), owner: addressOf(owner), sn: instanceId.toString() }
}

export function getDestroyCollectionEvent(ctx: Context): DestroyCollectionEvent {
  const event = new events.NftsDestroyedEvent(ctx)

  if (event.isV9420) {
    const { collection: classId } = event.asV9420
    return { id: classId.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId } = ctx._chain.decodeEvent(ctx.event)
  return { id: classId.toString() }
}

export function getListTokenEvent(ctx: Context): ListTokenEvent {
  const event = new events.NftsItemPriceSetEvent(ctx)

  if (event.isV9420) {
    const { collection: classId, item: instanceId, price } = event.asV9420
    return { collectionId: classId.toString(), sn: instanceId.toString(), price }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const {
    collection: classId,
    item: instanceId,
    price,
  } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: classId.toString(), sn: instanceId.toString(), price }
}

export function getUnListTokenEvent(ctx: Context): ListTokenEvent {
  const event = new events.NftsItemPriceRemovedEvent(ctx)

  if (event.isV9420) {
    const { collection: classId, item: instanceId } = event.asV9420
    return { collectionId: classId.toString(), sn: instanceId.toString(), price: 0n }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const {
    collection: classId,
    item: instanceId,
    price,
  } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: classId.toString(), sn: instanceId.toString(), price: 0n }
}

export function getPriceTokenEvent(ctx: Context): ListTokenEvent {
  if (ctx.event.name === Event.setPrice) {
    return getListTokenEvent(ctx)
  }

  return getUnListTokenEvent(ctx)
}

export function getBuyTokenEvent(ctx: Context): BuyTokenEvent {
  const event = new events.NftsItemBoughtEvent(ctx)

  if (event.isV9420) {
    const {
      collection: classId,
      item: instanceId,
      price,
      seller,
      buyer,
    } = event.asV9420
    return {
      collectionId: classId.toString(), caller: addressOf(buyer), sn: instanceId.toString(), price: BigInt(price ?? 0), currentOwner: addressOf(seller),
    }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const {
    collection: classId,
    item: instanceId,
    price,
    seller,
    buyer,
  } = ctx._chain.decodeEvent(ctx.event)
  return {
    collectionId: classId.toString(), caller: addressOf(buyer), sn: instanceId.toString(), price: BigInt(price ?? 0), currentOwner: addressOf(seller),
  }
}

export function getLockCollectionEvent(ctx: Context): LockCollectionEvent {
  const event = new events.NftsCollectionMaxSupplySetEvent(ctx)
  if (event.isV9420) {
    const { collection: classId, maxSupply: max } = event.asV9420
    return { id: classId.toString(), max }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, mamaxSupply: max } = ctx._chain.decodeEvent(ctx.event)
  return { id: classId.toString(), max }
}

export function getChangeCollectionOwnerEvent(ctx: Context): ChangeCollectionOwnerEvent {
  const event = new events.NftsOwnerChangedEvent(ctx)

  if (event.isV9420) {
    const { collection: classId, newOwner } = event.asV9420
    return { id: classId.toString(), owner: addressOf(newOwner) }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, newOwner } = ctx._chain.decodeEvent(ctx.event)
  return { id: classId.toString(), owner: addressOf(newOwner) }
  
}

export function getClearCollectionMetadataEvent(ctx: Context): SetMetadata {
  const event = new events.NftsCollectionMetadataClearedEvent(ctx)
  if (event.isV9420) {
    const { collection: classId } = event.asV9420
    return { collectionId: classId.toString() }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: classId.toString() }
}

export function getCreateCollectionMetadataEvent(ctx: Context): SetMetadata {
  const event = new events.NftsCollectionMetadataSetEvent(ctx)
  if (event.isV9420) {
    const { collection: classId, data } = event.asV9420
    return { collectionId: classId.toString(), metadata: data.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { class: classId, data, isFrozen } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: classId.toString(), metadata: data.toString() }
}

export function getClearClassMetadataEvent(ctx: Context): SetMetadata {
  const event = new events.NftsCollectionMetadataSetEvent(ctx)

  if (event.isV9420) {
    const { collection: classId, data } = event.asV9420
    return { collectionId: classId.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { class: classId } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: classId.toString() }
}

export function getCreateClassMetadataEvent(ctx: Context): SetMetadata {
  const event = new events.NftsCollectionMetadataSetEvent(ctx)

  if (event.isV9420) {
    const { collection: classId, data } = event.asV9420
    return { collectionId: classId.toString(), metadata: data.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { class: classId, data, isFrozen } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: classId.toString(), metadata: data.toString() }
}

export function getCreateMetadataEvent(ctx: Context): SetMetadata {
  const event = new events.NftsItemMetadataSetEvent(ctx)

  if (event.isV9420) {
    const {
      collection: classId,
      item: instanceId,
      data,
    } = event.asV9420
    return { collectionId: classId.toString(), sn: instanceId.toString(), metadata: data.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const {
    collection: classId,
    item: instanceId,
    data,
    isFrozen,
  } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: classId.toString(), sn: instanceId.toString(), metadata: data.toString() }
}

export function getClearMetadataEvent(ctx: Context): SetMetadata {
  const event = new events.NftsItemMetadataClearedEvent(ctx)

  if (event.isV9420) {
    const { collection: classId, item: instanceId } = event.asV9420
    return { collectionId: classId.toString(), sn: instanceId.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, item: instanceId } = ctx._chain.decodeEvent(
    ctx.event
  )
  return { collectionId: classId.toString(), sn: instanceId.toString() }
}

export function getMetadataEvent(ctx: Context): SetMetadata {
  switch (ctx.event.name) {
    case Event.clearCollectionMetadata:
      return getClearClassMetadataEvent(ctx)
    case Event.setCollectionMetadata:
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

function getSetAttributeEvent(
  ctx: Context
): SetAttribute {
  const event = new events.NftsAttributeSetEvent(ctx)
  if (event.isV9420) {
    const {
      collection: classId,
      maybeItem: instanceId,
      key,
      value,
    } = event.asV9420
    return { collectionId: classId.toString(), sn: instanceId?.toString(), trait: key.toString(), value: value.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const {
    collection: classId,
    maybeItem: instanceId,
    key,
    value,
  } = ctx._chain.decodeEvent(ctx.event)
  return { collectionId: classId.toString(), sn: instanceId?.toString(), trait: key.toString(), value: value.toString() }
}

function getClearAttributeEvent(ctx: Context): SetAttribute {
  const event = new events.NftsAttributeClearedEvent(ctx)

  if (event.isV9420) {
    const { collection: classId, maybeItem: instanceId, key } = event.asV9420
    return { collectionId: classId.toString(), sn: instanceId?.toString(), trait: key.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const {
    collection: classId,
    maybeItem: instanceId,
    key,
  } = ctx._chain.decodeEvent(ctx.event)
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
  const event = new events.NftsTeamChangedEvent(ctx)

  if (event.isV9420) {
    const { collection: classId, issuer, admin, freezer } = event.asV9420
    return { id: classId.toString(), issuer: addressOf(issuer || ''), admin: addressOf(admin || ''), freezer: addressOf(freezer || '') }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const {
    collection: classId,
    issuer,
    admin,
    freezer,
  } = ctx._chain.decodeEvent(ctx.event)
  return { id: classId.toString(), issuer: addressOf(issuer || ''), admin: addressOf(admin || ''), freezer: addressOf(freezer || '') }
}