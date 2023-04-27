
import { Interaction } from '../../model'
import * as events from '../../types/events'
import { addressOf } from '../utils/helper'
import { warn } from '../utils/logger'
import { Context } from '../utils/types'
import { BurnTokenEvent, BuyTokenEvent, CreateCollectionEvent, CreateTokenEvent, DestroyCollectionEvent, ListTokenEvent, LockCollectionEvent, SetCollectionMetadata, TransferTokenEvent } from './types'

export function getCreateCollectionEvent(ctx: Context): CreateCollectionEvent {
  const event = new events.UniquesCreatedEvent(ctx)
  if (event.isV1) {
    const [classId, creator, owner] = event.asV1
    return { id: classId.toString(), caller: addressOf(creator), owner: addressOf(owner) }
  }
  if (event.isV700) {
    const { class: classId, creator, owner } = event.asV700
    return { id: classId.toString(), caller: addressOf(creator), owner: addressOf(owner) }
  }
  if (event.isV9230) {
    const { collection: classId, creator, owner } = event.asV9230
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

export function getCreateTokenEvent(ctx: Context): CreateTokenEvent {
  const event = new events.UniquesIssuedEvent(ctx)
  if (event.isV1) {
    const [classId, instanceId, owner] = event.asV1
    return { collectionId: classId.toString(), owner: addressOf(owner), sn: instanceId.toString() }
  }
  if (event.isV700) {
    const { class: classId, instance: instanceId, owner } = event.asV700
    return { collectionId: classId.toString(), owner: addressOf(owner), sn: instanceId.toString() }
  }
  if (event.isV9230) {
    const { collection: classId, item: instanceId, owner } = event.asV9230
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
  const event = new events.UniquesTransferredEvent(ctx)
  if (event.isV1) {
    const [classId, instanceId, from, to] = event.asV1
    return { collectionId: classId.toString(), caller: addressOf(from), sn: instanceId.toString(), to: addressOf(to), }
  }
  if (event.isV700) {
    const { class: classId, instance: instanceId, from, to } = event.asV700
    return { collectionId: classId.toString(), caller: addressOf(from), sn: instanceId.toString(), to: addressOf(to), }
  }
  if (event.isV9230) {
    const { collection: classId, item: instanceId, from, to } = event.asV9230
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
  const event = new events.UniquesBurnedEvent(ctx)
  if (event.isV1) {
    const [classId, instanceId, owner] = event.asV1
    return { collectionId: classId.toString(), owner: addressOf(owner), sn: instanceId.toString() }
  }
  if (event.isV700) {
    const { class: classId, instance: instanceId, owner } = event.asV700
    return { collectionId: classId.toString(), owner: addressOf(owner), sn: instanceId.toString() }
  }
  if (event.isV9230) {
    const { collection: classId, item: instanceId, owner } = event.asV9230
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
  const event = new events.UniquesDestroyedEvent(ctx)
  if (event.isV1) {
    const classId = event.asV1
    return { id: classId.toString() }
  }
  if (event.isV700) {
    const { class: classId } = event.asV700
    return { id: classId.toString() }
  }
  if (event.isV9230) {
    const { collection: classId } = event.asV9230
    return { id: classId.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId } = ctx._chain.decodeEvent(ctx.event)
  return { id: classId.toString() }
}

export function getListTokenEvent(ctx: Context): ListTokenEvent {
  const event = new events.UniquesItemPriceSetEvent(ctx)

  if (event.isV9270) {
    const { collection: classId, item: instanceId, price } = event.asV9270
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
  const event = new events.UniquesItemPriceRemovedEvent(ctx)

  if (event.isV9270) {
    const { collection: classId, item: instanceId } = event.asV9270
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

export function getBuyTokenEvent(ctx: Context): BuyTokenEvent {
  const event = new events.UniquesItemBoughtEvent(ctx)

  if (event.isV9270) {
    const {
      collection: classId,
      item: instanceId,
      price,
      seller,
      buyer,
    } = event.asV9270
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
  const event = new events.UniquesCollectionMaxSupplySetEvent(ctx)
  if (event.isV9230) {
    const { collection: classId, maxSupply: max } = event.asV9230
    return { id: classId.toString(), max }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId, mamaxSupply: max } = ctx._chain.decodeEvent(ctx.event)
  return { id: classId.toString(), max }
}

export function getClearCollectionMetadataEvent(ctx: Context): SetCollectionMetadata {
  const event = new events.UniquesCollectionMetadataClearedEvent(ctx)
  if (event.isV9230) {
    const { collection: classId } = event.asV9230
    return { id: classId.toString() }
  }
  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { collection: classId } = ctx._chain.decodeEvent(ctx.event)
  return { id: classId.toString() }
}

export function getCreateCollectionMetadataEvent(ctx: Context): SetCollectionMetadata {
  const event = new events.UniquesClassMetadataSetEvent(ctx)
  if (event.isV1) {
    const [classId, data, isFrozen] = event.asV1
    return { id: classId.toString(), metadata: data.toString() }
  }
  if (event.isV700) {
    const { class: classId, data, isFrozen } = event.asV700
    return { id: classId.toString(), metadata: data.toString() }
  }

  ctx.log.warn('USING UNSAFE GETTER! PLS UPDATE TYPES!')
  const { class: classId, data, isFrozen } = ctx._chain.decodeEvent(ctx.event)
  return { id: classId.toString(), metadata: data.toString() }
}