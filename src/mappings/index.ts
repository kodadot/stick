import { logger } from '@kodadot1/metasquid/logger'

import { Store } from '@subsquid/typeorm-store'
import { STARTING_BLOCK } from '../environment'
import { NFTEntity as NE } from '../model'
import { Asset, NonFungible, NonFungibleCall, NewNonFungible, Unique } from '../processable'
import * as a from './assets'
import * as n from './nfts'
import * as u from './uniques'
import { BatchContext, Context, SelectedEvent } from './utils/types'
import { ParachainSystemCall } from '../processable'
import { updateSwapsCache } from './utils/cache'

type HandlerFunction = <T extends SelectedEvent>(item: T, ctx: Context) => Promise<void>

/**
 * Main entry point for processing non-fungibles on unique pallet
 * @param item - the event to process
 * @param ctx - the context for the event
**/
export async function uniques<T extends SelectedEvent>(item: T, ctx: Context): Promise<void> {
  switch (item.name) {
    case Unique.createCollection:
      await u.handleCollectionCreate(ctx)
      break
    case Unique.forceCreateClass:
      await u.handleForceCollectionCreate(ctx)
      break
    case Unique.clearClassMetadata:
      await u.handleMetadataSet(ctx)
      break
    case Unique.setClassMetadata:
      await u.handleMetadataSet(ctx)
      break
    case Unique.setCollectionMaxSupply:
      await u.handleCollectionLock(ctx)
      break
    case Unique.clearCollectionMetadata:
      await u.handleMetadataSet(ctx)
      break
    case Unique.setCollectionMetadata:
      await u.handleMetadataSet(ctx)
      break
    case Unique.setAttribute:
    case Unique.clearAttribute:
      await u.handleAttributeSet(ctx)
      break
    case Unique.destroyCollection:
      await u.handleCollectionDestroy(ctx)
      break
    case Unique.burn:
      await u.handleTokenBurn(ctx)
      break
    case Unique.createItem:
      await u.handleTokenCreate(ctx)
      break
    case Unique.sold:
      await u.handleTokenBuy(ctx)
      break
    case Unique.clearPrice:
      await u.handleTokenList(ctx)
      break
    case Unique.setPrice:
      await u.handleTokenList(ctx)
      break
    case Unique.clearMetadata:
      await u.handleMetadataSet(ctx)
      break
    case Unique.setMetadata:
      await u.handleMetadataSet(ctx)
      break
    case Unique.changeIssuer:
      await u.handleCollectionOwnerChange(ctx)
      break
    case Unique.changeTeam:
      await u.handleCollectionTeamChange(ctx)
      break
    case Unique.transfer:
      await u.handleTokenTransfer(ctx)
      break
    default:
      throw new Error(`Unknown event ${item.name}`)
  }
  // return item
}

/**
 * Main entry point for processing non-fungible tokens
 * @param item - the event to process
 * @param ctx - the context for the event
**/
export async function nfts<T extends SelectedEvent>(item: T, ctx: Context): Promise<void> {
  switch (item.name) {
    case NonFungible.createCollection:
      await n.handleCollectionCreate(ctx)
      break
    case NonFungible.clearAttribute:
      await n.handleAttributeSet(ctx)
      break
    case NonFungible.setAttribute:
      await n.handleAttributeSet(ctx)
      break
    case NonFungible.burn:
      await n.handleTokenBurn(ctx)
      break
    case NonFungible.forceCreateCollection:
      await n.handleForceCollectionCreate(ctx)
      break
    case NonFungible.clearCollectionMetadata:
      await n.handleMetadataSet(ctx)
      break
    case NonFungible.setCollectionMetadata:
      await n.handleMetadataSet(ctx)
      break
    case NonFungible.setCollectionMaxSupply:
      await n.handleCollectionLock(ctx)
      break
    case NonFungible.destroyCollection:
      await n.handleCollectionDestroy(ctx)
      break
    case NonFungible.createItem:
      await n.handleTokenCreate(ctx)
      break
    case NonFungible.sold:
      await n.handleTokenBuy(ctx)
      break
    case NonFungible.clearPrice:
      await n.handleTokenList(ctx)
      break
    case NonFungible.setPrice:
      await n.handleTokenList(ctx)
      break
    case NonFungible.clearMetadata:
      await n.handleMetadataSet(ctx)
      break
    case NonFungible.setMetadata:
      await n.handleMetadataSet(ctx)
      break
    case NonFungible.changeIssuer:
      await n.handleCollectionOwnerChange(ctx)
      break
    case NonFungible.changeTeam:
      await n.handleCollectionTeamChange(ctx)
      break
    case NonFungible.transfer:
      await n.handleTokenTransfer(ctx)
      break
    case NonFungibleCall.updateMintSettings:
      await n.handleCollectionMintUpdate(ctx)
      break
    case NewNonFungible.sendTip:
      await n.handleTipSend(ctx)
      break
    case NewNonFungible.createSwap:
      await n.handleCreateSwap(ctx)
      break
    case NewNonFungible.claimSwap:
      await n.handleClaimSwap(ctx)
      break
    case NewNonFungible.cancelSwap:
      await n.handleCancelSwap(ctx)
      break
    default:
      throw new Error(`Unknown event ${item.name}`)
  }
}

/**
 * Main entry point for processing assets
 * @param item - the event to process
 * @param ctx - the context for the event
**/
export async function assets<T extends SelectedEvent>(item: T, ctx: Context): Promise<void> {
  switch (item.name) {
    case Asset.setMetadata:
      await a.handleAssetMetadataSet(ctx)
      break
    default:
      throw new Error(`Unknown event ${item.name}`)
  }
}

/**
 * Force create system and USDT assets
 * Only call this once, at the start of the processing
**/
export async function forceAssets(ctx: BatchContext<Store>): Promise<void> {
  logger.info('Forcing assets')
  await a.forceCreateSystemAsset(ctx)
  await a.forceCreateUsdtAsset(ctx)
}

/**
 * Smart pattern matching to determine which handler to use
 * currently supports Uniques, Nfts, and Assets
**/
const globalHandler: Record<string, HandlerFunction> = {
  Uniques: uniques,
  Nfts: nfts,
  Assets: assets,
}

/**
 * mainFrame is the main entry point for processing a batch of blocks
**/
export async function mainFrame(ctx: BatchContext<Store>): Promise<void> {
  const start = ctx.blocks[0].header.height
  if (STARTING_BLOCK === start) {
    await forceAssets(ctx)
  }
  
  logger.info(
    `Processing ${ctx.blocks.length} blocks from ${ctx.blocks[0].header.height} to ${
      ctx.blocks[ctx.blocks.length - 1].header.height
    }`
  )

  for (const block of ctx.blocks) {
    let relayParentNumber: number | undefined

    const validationCall = block.calls?.find((c) => c.name === ParachainSystemCall.setValidationData)

    if (validationCall) {
      relayParentNumber = validationCall.args?.data?.validationData?.relayParentNumber as number | undefined
    }

    for (let event of block.events) {
      logger.debug(`Processing ${event.name}`)
      const [pallet] = event.name.split('.')
      const handler =  globalHandler[pallet]
      if (!handler) {
        throw new Error(`Unknown pallet ${pallet}`)
      }
      await handler(event, {
        event,
        block: block.header,
        store: ctx.store,
        extrinsic: event.extrinsic,
        call: event.call,
        relayParentNumber,
      })
      // const item = event
    }
  }

  if (ctx.isHead) {
    const lastBlock = ctx.blocks[ctx.blocks.length - 1].header
    const lastDate = new Date(lastBlock.timestamp || Date.now())
    logger.info(`Found head block, updating cache`)
    await updateSwapsCache(lastDate, lastBlock.height, ctx.store)
  }
}

// class Head {
//   #height: number

//   constructor(height: number) {
//     this.#height = height
//   }

//   get height() {
//     return this.#height
//   }

//   set height(height: number) {
//     this.#height = height
//   }
// }
