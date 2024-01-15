import { logger } from '@kodadot1/metasquid/logger'

import { Store } from '@subsquid/typeorm-store'
import { NFTEntity as NE } from '../model'
import { NonFungible, Unique } from '../processable'
import * as n from './nfts'
import * as u from './uniques'
import { BatchContext, Context, SelectedEvent } from './utils/types'

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
  }
}

export async function mainFrame(ctx: BatchContext<Store>): Promise<void> {
  logger.info(
    `Processing ${ctx.blocks.length} blocks from ${ctx.blocks[0].header.height} to ${
      ctx.blocks[ctx.blocks.length - 1].header.height
    }`
  )

  for (const block of ctx.blocks) {
    for (let event of block.events) {
      logger.debug(`Processing ${event.name}`)
      const [pallet] = event.name.split('.')
      const handler =  pallet === 'Uniques' ? uniques : nfts
      await handler(event, {
        event,
        block: block.header,
        store: ctx.store,
        extrinsic: event.extrinsic,
        call: event.call,
      })
      // const item = event
    }
  }
  // const { contracts, tokens } = uniqueEntitySets(items)
  // const collections = await finalizeCollections(contracts, ctx)
  // const finish = await whatToDoWithTokens({ tokens, collections, items }, ctx)
  // const complete = await completeTokens(ctx, finish)

  // logger.info(`Batch completed, ${complete.length} tokens saved`)
}

// function unwrapLog(log: Log, block: BlockData) {
//   switch (log.topics[0]) {
//     case ERC721_TRANSFER:

//       if (log.address !== Contracts.HueNft) {
//         return null
//       }
//       return handle721Token(log, block)
//     default:
//       // console.log('unknown log', log.topics[0])
//       return null
//     // throw new Error('unknown log')
//   }
// }

type What = {
  // tokens: Set<string>,
  // collections: EnMap<CE>,
  // items: ItemStateUpdate[],
}

export async function whatToDoWithTokens(x: What, ctx: Context) {
  // // ctx.store.findBy(CE, {id: In([...collectionMap.keys()])})
  // const knownTokens = await findByIdListAsMap(ctx.store, NE, tokens)
  // const events: EventEntity[] = []
  // for (const item of items) {
  //   logger.debug(`APPLY ${item.interaction} on ${item.id}`)
  //   let knownToken = knownTokens.get(item.id) ?? create(NE, item.id, {})
  //   if (item.applyFrom) {
  //     const collection = collections.get(item.contract)!
  //     item.applyFrom(collection)
  //   }
  //   if (item.applyTo) {
  //     knownToken = item.applyTo(knownToken)
  //   }
  //   events.push(item.event)
  //   knownTokens.set(item.id, knownToken)
  // }
  // const values = [...knownTokens.values()]
  // await ctx.store.upsert(values)
  // await ctx.store.save(events)
  // return knownTokens
}

type EnMap<T> = Map<string, T>
// TODO: do only if event was mint.
async function completeTokens(ctx: Context, tokenMap: EnMap<NE>) {
  //   const collections = groupedItemsByCollection(tokenMap.keys())
  //   const final: NE[] = []
  //   const metadataFutures: Promise<Optional<MetadataEntity>>[] = []
  //   for (const [contract, ids] of collections.entries()) {
  //     const list = Array.from(ids)
  //     const tokens = await multicallMetadataFetch(ctx, contract, list)
  //     for (const [i, id] of list.entries()) {
  //       const realId = createTokenId(contract, id)
  //       const token = tokenMap.get(realId)!
  //       if (!token.metadata) {
  //         const metadata = tokens[i]
  //         token.metadata = metadata
  //         const getMeta = handleMetadata(metadata, ctx.store).then(m => {
  //           if (m) {
  //             token.meta = m
  //             token.name = m.name
  //             token.image = m.image
  //             token.media = m.animationUrl
  //           }
  //           return m
  //         })
  //         metadataFutures.push(getMeta)
  //         final.push(token)
  //       }
  //     }
  //   }
  //   const metaList = await Promise.all(metadataFutures)
  //   const filtered = metaList.filter(m => m) as MetadataEntity[]
  //   logger.debug(`Saving ${filtered.length} metadata`)
  //   await ctx.store.save(filtered)
  //   await ctx.store.save(final)
  //   return final
  // }
  // async function multicallMetadataFetch(ctx: Context, collection: string, tokens: Array<string>): Promise<string[]> {
  //   const tokenIds = tokens.map((id) => [BigInt(id)])
  //   const contract = new Multicall(ctx, lastBatchBlock(ctx), MULTICALL_ADDRESS)
  //   const metadata = await contract.aggregate(
  //     erc721.functions.tokenURI,
  //     collection,
  //     tokenIds,
  //     MULTICALL_BATCH_SIZE
  //   )
  //   return metadata
}
