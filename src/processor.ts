import {
  DataHandlerContext,
  FieldSelection,
  SubstrateBatchProcessor as SubstrateProcessor
} from '@subsquid/substrate-processor'
import { TypeormDatabase as Database } from '@subsquid/typeorm-store'
import logger from './mappings/utils/logger'
import { Asset, NonFungible, Unique } from './processable'

import { CHAIN, getArchiveUrl, getNodeUrl } from './environment'
import { SelectedFields, Store, fieldSelection } from './mappings/utils/types'
import { mainFrame } from './mappings'

const database = new Database()
const processor = new SubstrateProcessor<SelectedFields>()

const UNIQUE_STARTING_BLOCK = 323_750 // 618838;
// const _NFT_STARTING_BLOCK = 4_556_552
const STARTING_BLOCK = UNIQUE_STARTING_BLOCK

// processor.setTypesBundle(CHAIN)
processor.setBlockRange({ from: STARTING_BLOCK })

const archive = getArchiveUrl()
const chain = getNodeUrl()

processor.setDataSource({
  archive,
  chain: {
    url: chain,
    rateLimit: 10
  },
})

// disables RPC ingestion and drastically reduce no of RPC calls
processor.useArchiveOnly(true)

/**
 * Uniques nft pallet
 */
processor.addEvent({ name: [Unique.createCollection], call: true, extrinsic: true }) // u.handleCollectionCreate)
processor.addEvent({ name: [Unique.clearAttribute], call: true, extrinsic: true }) // u.handleAttributeSet)
processor.addEvent({ name: [Unique.setAttribute], call: true, extrinsic: true }) // u.handleAttributeSet)
processor.addEvent({ name: [Unique.burn], call: true, extrinsic: true }) // u.handleTokenBurn)
processor.addEvent({ name: [Unique.forceCreateClass], call: true, extrinsic: true }) // u.handleForceCollectionCreate)
// processor.addEvent({   name: [Unique.freezeClass, dummy);
processor.addEvent({ name: [Unique.clearClassMetadata], call: true, extrinsic: true }) // u.handleMetadataSet)
processor.addEvent({ name: [Unique.setClassMetadata], call: true, extrinsic: true }) // u.handleMetadataSet)
// processor.addEvent({   name: [Unique.thawClass, dummy);
// processor.addEvent({   name: [Unique.freezeCollection, dummy);
processor.addEvent({ name: [Unique.setCollectionMaxSupply], call: true, extrinsic: true }) // u.handleCollectionLock)
processor.addEvent({ name: [Unique.clearCollectionMetadata], call: true, extrinsic: true }) // u.handleMetadataSet)
processor.addEvent({ name: [Unique.setCollectionMetadata], call: true, extrinsic: true }) // u.handleMetadataSet)
// processor.addEvent({   name: [Unique.thawCollection], call: true, extrinsic: true  }) // dummy)
processor.addEvent({ name: [Unique.destroyCollection], call: true, extrinsic: true }) // u.handleCollectionDestroy)
// processor.addEvent({   name: [Unique.freeze, dummy);
processor.addEvent({ name: [Unique.createItem], call: true, extrinsic: true }) // u.handleTokenCreate)
processor.addEvent({ name: [Unique.sold], call: true, extrinsic: true }) // u.handleTokenBuy)
processor.addEvent({ name: [Unique.clearPrice], call: true, extrinsic: true }) // u.handleTokenList)
processor.addEvent({ name: [Unique.setPrice], call: true, extrinsic: true }) // u.handleTokenList)
processor.addEvent({ name: [Unique.clearMetadata], call: true, extrinsic: true }) // u.handleMetadataSet)
processor.addEvent({ name: [Unique.setMetadata], call: true, extrinsic: true }) // u.handleMetadataSet)
processor.addEvent({ name: [Unique.changeIssuer], call: true, extrinsic: true }) // u.handleCollectionOwnerChange)
// processor.addEvent({   name: [Unique.changeOwnershipAcceptance, dummy);
processor.addEvent({ name: [Unique.changeTeam], call: true, extrinsic: true }) // u.handleCollectionTeamChange)
// processor.addEvent({   name: [Unique.thaw, dummy);
processor.addEvent({ name: [Unique.transfer], call: true, extrinsic: true }) // u.handleTokenTransfer)

/**
 * NonFungibles nft pallet
 */
processor.addEvent({ name: [NonFungible.createCollection], call: true, extrinsic: true }) // n.handleCollectionCreate)
processor.addEvent({ name: [NonFungible.clearAttribute], call: true, extrinsic: true }) // n.handleAttributeSet)
processor.addEvent({ name: [NonFungible.setAttribute], call: true, extrinsic: true }) // n.handleAttributeSet)
processor.addEvent({ name: [NonFungible.burn], call: true, extrinsic: true }) // n.handleTokenBurn)

// Changed
processor.addEvent({ name: [NonFungible.forceCreateCollection], call: true, extrinsic: true }) // n.handleForceCollectionCreate)
// processor.addEvent({   name: [NonFungible.freezeClass, dummy);
processor.addEvent({ name: [NonFungible.clearCollectionMetadata], call: true, extrinsic: true }) // n.handleMetadataSet)
processor.addEvent({ name: [NonFungible.setCollectionMetadata], call: true, extrinsic: true }) // n.handleMetadataSet)
// end changed
// processor.addEvent({   name: [NonFungible.thawClass, dummy);
// processor.addEvent({   name: [NonFungible.freezeCollection, dummy);
processor.addEvent({ name: [NonFungible.setCollectionMaxSupply], call: true, extrinsic: true }) // n.handleCollectionLock)
processor.addEvent({ name: [NonFungible.clearCollectionMetadata], call: true, extrinsic: true }) // n.handleMetadataSet)
processor.addEvent({ name: [NonFungible.setCollectionMetadata], call: true, extrinsic: true }) // n.handleMetadataSet)
// processor.addEvent({   name: [NonFungible.thawCollection], call: true, extrinsic: true  }) // dummy)
processor.addEvent({ name: [NonFungible.destroyCollection], call: true, extrinsic: true }) // n.handleCollectionDestroy)
// processor.addEvent({   name: [NonFungible.freeze, dummy);
processor.addEvent({ name: [NonFungible.createItem], call: true, extrinsic: true }) // n.handleTokenCreate)
processor.addEvent({ name: [NonFungible.sold], call: true, extrinsic: true }) // n.handleTokenBuy)
processor.addEvent({ name: [NonFungible.clearPrice], call: true, extrinsic: true }) // n.handleTokenList)
processor.addEvent({ name: [NonFungible.setPrice], call: true, extrinsic: true }) // n.handleTokenList)
processor.addEvent({ name: [NonFungible.clearMetadata], call: true, extrinsic: true }) // n.handleMetadataSet)
processor.addEvent({ name: [NonFungible.setMetadata], call: true, extrinsic: true }) // n.handleMetadataSet)
processor.addEvent({ name: [NonFungible.changeIssuer], call: true, extrinsic: true }) // n.handleCollectionOwnerChange)
// processor.addEvent({   name: [NonFungible.changeOwnershipAcceptance, dummy);
processor.addEvent({ name: [NonFungible.changeTeam], call: true, extrinsic: true }) // n.handleCollectionTeamChange)
// processor.addEvent({   name: [NonFungible.thaw, dummy);
processor.addEvent({ name: [NonFungible.transfer], call: true, extrinsic: true }) // n.handleTokenTransfer)

processor.setFields(fieldSelection)

/**
 * Assets pallet
 */
// processor.addPreHook({ range: { from: STARTING_BLOCK, to: STARTING_BLOCK } }, a.forceCreateSystemAsset);
// processor.addPreHook({ range: { from: STARTING_BLOCK, to: STARTING_BLOCK } }, a.forceCreateUsdtAsset);

// if (CHAIN === 'kusama') {
//   processor.addPreHook({ range: { from: STARTING_BLOCK, to: STARTING_BLOCK } }, a.forceCreateRmrkAsset);
// }
// processor.addEvent({ name: [Asset.create], call: true, extrinsic: true })
// processor.addEvent({ name: [Asset.forceCreate], call: true, extrinsic: true })
processor.addEvent({ name: [Asset.setMetadata], call: true, extrinsic: true })
// processor.addEvent({ name: [Asset.clearMetadata], call: true, extrinsic: true })

logger.info(`PROCESSING ~~ ${CHAIN.toUpperCase()} ~~ EVENTS`)

// const handler = async <T extends FieldSelection = SelectedFields>(ctx: DataHandlerContext<Store, T>) => {}

processor.run(database, mainFrame)

