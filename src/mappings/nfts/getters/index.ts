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
  UpdateMintSettings,
} from '../types'

// eslint-disable-next-line unicorn/prefer-module
const proc = require(`./${CHAIN}`)

export function getCreateCollectionEvent(_ctx: Context): CreateCollectionEvent {
  const ctx = _ctx.event 
 return proc.getCreateCollectionEvent(ctx);
}

export function getForceCreateCollectionEvent(_ctx: Context): ForceCreateCollectionEvent {
  const ctx = _ctx.event 
 return proc.getForceCreateCollectionEvent(ctx);
}

export function getCreateTokenEvent(_ctx: Context): CreateTokenEvent {
  const ctx = _ctx.event 
 return proc.getCreateTokenEvent(ctx);
}

export function getTransferTokenEvent(_ctx: Context): TransferTokenEvent {
  const ctx = _ctx.event 
 return proc.getTransferTokenEvent(ctx);
}

export function getTipSentEvent(_ctx: Context) {
  const ctx = _ctx.event 
 return proc.getTipSentEvent(ctx)
}

export function getBurnTokenEvent(_ctx: Context): BurnTokenEvent {
  const ctx = _ctx.event 
 return proc.getBurnTokenEvent(ctx);
}

export function getDestroyCollectionEvent(_ctx: Context): DestroyCollectionEvent {
  const ctx = _ctx.event 
 return proc.getDestroyCollectionEvent(ctx);
}

export function getListTokenEvent(_ctx: Context): ListTokenEvent {
  const ctx = _ctx.event 
 return proc.getListTokenEvent(ctx);
}

export function getUnListTokenEvent(_ctx: Context): ListTokenEvent {
  const ctx = _ctx.event 
 return proc.getUnListTokenEvent(ctx);
}

export function getPriceTokenEvent(_ctx: Context): ListTokenEvent {
  const ctx = _ctx.event 
 return proc.getPriceTokenEvent(ctx);
}

export function getBuyTokenEvent(_ctx: Context): BuyTokenEvent {
  const ctx = _ctx.event 
 return proc.getBuyTokenEvent(ctx);
}

export function getLockCollectionEvent(_ctx: Context): LockCollectionEvent {
  const ctx = _ctx.event 
 return proc.getLockCollectionEvent(ctx);
}

export function getChangeCollectionOwnerEvent(_ctx: Context): ChangeCollectionOwnerEvent {
  const ctx = _ctx.event 
 return proc.getChangeCollectionOwnerEvent(ctx);
}

export function getClearCollectionMetadataEvent(_ctx: Context): SetMetadata {
  const ctx = _ctx.event 
 return proc.getClearCollectionMetadataEvent(ctx);
}

export function getCreateCollectionMetadataEvent(_ctx: Context): SetMetadata {
  const ctx = _ctx.event 
 return proc.getCreateCollectionMetadataEvent(ctx);
}

export function getClearClassMetadataEvent(_ctx: Context): SetMetadata {
  const ctx = _ctx.event 
 return proc.getClearClassMetadataEvent(ctx);
}

export function getCreateClassMetadataEvent(_ctx: Context): SetMetadata {
  const ctx = _ctx.event 
 return proc.getCreateClassMetadataEvent(ctx);
}

export function getCreateMetadataEvent(_ctx: Context): SetMetadata {
  const ctx = _ctx.event 
 return proc.getCreateMetadataEvent(ctx);
}

export function getClearMetadataEvent(_ctx: Context): SetMetadata {
  const ctx = _ctx.event 
 return proc.getClearMetadataEvent(ctx);
}

export function getMetadataEvent(_ctx: Context): SetMetadata {
  const ctx = _ctx.event 
 return proc.getMetadataEvent(ctx);
}

export function getSetAttributeEvent(_ctx: Context): SetAttribute {
  const ctx = _ctx.event 
 return proc.getSetAttributeEvent(ctx);
}

export function getClearAttributeEvent(_ctx: Context): SetAttribute {
  const ctx = _ctx.event 
 return proc.getClearAttributeEvent(ctx);
}

export function getAttributeEvent(_ctx: Context): SetAttribute {
  const ctx = _ctx.event 
 return proc.getAttributeEvent(ctx);
}

export function getChangeTeamEvent(_ctx: Context): ChangeCollectionTeam {
  const ctx = _ctx.event 
 return proc.getChangeTeamEvent(ctx);
}

export function getUpdateMintCall(_ctx: Context): UpdateMintSettings {
  const ctx = _ctx.call 
 return proc.getUpdateMintCall(ctx);
}
