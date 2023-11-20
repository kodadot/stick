import { ArchiveCallWithOptionalValue } from '@kodadot1/metasquid/types'
import { addressOf, onlyValue } from './helper'
import { BaseCall, CallWith, Context, UnwrapFunc } from './types'

// function toBaseCall(extrinsic: ExtrinsicHandlerContext): BaseCall {
//   const caller = extrinsic.extrinsic.signer.toString();
//   const blockNumber = extrinsic.block.height.toString();
//   const timestamp = new Date(extrinsic.block.timestamp);

//   return { caller, blockNumber, timestamp };
// }

function toBaseEvent(ctx: Context): BaseCall {
  const address = onlyValue(ctx.extrinsic?.signature?.address as ArchiveCallWithOptionalValue)
  const caller = addressOf(address)
  const blockNumber = ctx.block.height.toString()
  const timestamp = ctx.block.timestamp ? new Date(ctx.block.timestamp) : new Date()

  return { caller, blockNumber, timestamp }
}

export function unwrap<T>(ctx: Context, unwrapFn: UnwrapFunc<T>): CallWith<T> {
  const baseCall = toBaseEvent(ctx)
  const unwrapped = unwrapFn(ctx)
  return { ...baseCall, ...unwrapped }
}
