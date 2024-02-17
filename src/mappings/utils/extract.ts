import { ArchiveCallWithOptionalValue } from '@kodadot1/metasquid/types'
import { addressOf, onlyValue } from './helper'
import { BaseCall, CallWith, Context, UnwrapFunc } from './types'

// function toBaseCall(extrinsic: ExtrinsicHandlerContext): BaseCall {
//   const caller = extrinsic.extrinsic.signer.toString();
//   const blockNumber = extrinsic.block.height.toString();
//   const timestamp = new Date(extrinsic.block.timestamp);

//   return { caller, blockNumber, timestamp };
// }

/**
 * Extract the base event information from the context
 * @param ctx - the context for the event
**/
function toBaseEvent(ctx: Context): BaseCall {
  const address = onlyValue(ctx.extrinsic?.signature?.address as ArchiveCallWithOptionalValue)
  const caller = addressOf(address)
  const blockNumber = ctx.block.height.toString()
  const timestamp = ctx.block.timestamp ? new Date(ctx.block.timestamp) : new Date()

  return { caller, blockNumber, timestamp }
}

/**
 * Peform the unwrapping of the event from chain info into usable data
 * @param ctx - the context for the event
 * @param unwrapFn - the function to extract the event information
**/
export function unwrap<T>(ctx: Context, unwrapFn: UnwrapFunc<T>): CallWith<T> {
  const baseCall = toBaseEvent(ctx)
  const unwrapped = unwrapFn(ctx)
  return { ...baseCall, ...unwrapped }
}

// export function ctxOf<T extends BatchContext<Store>>(
//   block: SingleArrayType<Pick<T, 'blocks'>>
// ): Context {

// }
