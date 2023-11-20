import { CHAIN } from '../../../environment'
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

// eslint-disable-next-line unicorn/prefer-module
const proc = require(`./${CHAIN}`)

export function getCreateCollectionEvent(ctx: Context): CreateCollectionEvent {
  return proc.getCreateCollectionEvent(ctx)
}

export function getForceCreateCollectionEvent(ctx: Context): ForceCreateCollectionEvent {
  return proc.getForceCreateCollectionEvent(ctx)
}

export function getCreateTokenEvent(ctx: Context): CreateTokenEvent {
  return proc.getCreateTokenEvent(ctx)
}

export function getTransferTokenEvent(ctx: Context): TransferTokenEvent {
  return proc.getTransferTokenEvent(ctx)
}

export function getBurnTokenEvent(ctx: Context): BurnTokenEvent {
  return proc.getBurnTokenEvent(ctx)
}

export function getDestroyCollectionEvent(ctx: Context): DestroyCollectionEvent {
  return proc.getDestroyCollectionEvent(ctx)
}
export function getListTokenEvent(ctx: Context): ListTokenEvent {
  return proc.getListTokenEvent(ctx)
}

export function getUnListTokenEvent(ctx: Context): ListTokenEvent {
  return proc.getUnListTokenEvent(ctx)
}

export function getPriceTokenEvent(ctx: Context): ListTokenEvent {
  return proc.getPriceTokenEvent(ctx)
}

export function getBuyTokenEvent(ctx: Context): BuyTokenEvent {
  return proc.getBuyTokenEvent(ctx)
}

export function getLockCollectionEvent(ctx: Context): LockCollectionEvent {
  return proc.getLockCollectionEvent(ctx)
}

export function getChangeCollectionOwnerEvent(ctx: Context): ChangeCollectionOwnerEvent {
  return proc.getChangeCollectionOwnerEvent(ctx)
}

export function getClearCollectionMetadataEvent(ctx: Context): SetMetadata {
  return proc.getClearCollectionMetadataEvent(ctx)
}

export function getCreateCollectionMetadataEvent(ctx: Context): SetMetadata {
  return proc.getCreateCollectionMetadataEvent(ctx)
}

export function getClearClassMetadataEvent(ctx: Context): SetMetadata {
  return proc.getClearClassMetadataEvent(ctx)
}

export function getCreateClassMetadataEvent(ctx: Context): SetMetadata {
  return proc.getCreateClassMetadataEvent(ctx)
}

export function getCreateMetadataEvent(ctx: Context): SetMetadata {
  return proc.getCreateMetadataEvent(ctx)
}

export function getClearMetadataEvent(ctx: Context): SetMetadata {
  return proc.getClearMetadataEvent(ctx)
}

export function getMetadataEvent(ctx: Context): SetMetadata {
  return proc.getMetadataEvent(ctx)
}

export function getAttributeEvent(ctx: Context): SetAttribute {
  return proc.getAttributeEvent(ctx)
}

export function getChangeTeamEvent(ctx: Context): ChangeCollectionTeam {
  return proc.getChangeTeamEvent(ctx)
}
