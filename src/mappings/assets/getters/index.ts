import { CHAIN } from '../../../environment'
import { Context } from '../../utils/types'

// eslint-disable-next-line unicorn/prefer-module
const proc = require(`./${CHAIN}`)

export function getCreateAssetEvent(_ctx: Context) {
  const ctx = _ctx.event
  return proc.getCreateAssetEvent(ctx)
}
export function getForceCreateAssetEvent(_ctx: Context) {
  const ctx = _ctx.event
  return proc.getForceCreateAssetEvent(ctx)
}
export function getCreateAssetMetadataEvent(_ctx: Context) {
  const ctx = _ctx.event
  return proc.getCreateAssetMetadataEvent(ctx)
}
