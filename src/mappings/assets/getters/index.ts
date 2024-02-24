import { CHAIN } from '../../../environment'
import { Context } from '../../utils/types'
import { CreateAssetEvent, ForceCreateAssetEvent, SetMetadata } from '../types'

// eslint-disable-next-line unicorn/prefer-module
const proc = require(`./${CHAIN}`)

export function getCreateAssetEvent(_ctx: Context): CreateAssetEvent {
  const ctx = _ctx.event
  return proc.getCreateAssetEvent(ctx)
}
export function getForceCreateAssetEvent(_ctx: Context): ForceCreateAssetEvent {
  const ctx = _ctx.event
  return proc.getForceCreateAssetEvent(ctx)
}
export function getCreateAssetMetadataEvent(_ctx: Context): SetMetadata {
  const ctx = _ctx.event
  return proc.getCreateAssetMetadataEvent(ctx)
}
