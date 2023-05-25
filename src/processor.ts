import { SubstrateProcessor } from "@subsquid/substrate-processor"
import { FullTypeormDatabase as Database } from '@subsquid/typeorm-store'
import logger from './mappings/utils/logger'
import { Unique, NonFungible } from './processable'

import { getArchiveUrl, getNodeUrl, CHAIN } from './environment'
import * as u from './mappings/uniques'
import * as n from './mappings/nfts';

const database = new Database();
const processor = new SubstrateProcessor(database);

const STARTING_BLOCK = 323750; //618838;

processor.setTypesBundle(CHAIN)
processor.setBlockRange({ from: STARTING_BLOCK });

const archive = getArchiveUrl();
const chain = getNodeUrl();

processor.setDataSource({
    archive,
    chain,
});

const dummy = async () => {}

/**
 * Uniques nft pallet
*/
processor.addEventHandler(Unique.createCollection, u.handleCollectionCreate);
processor.addEventHandler(Unique.clearAttribute, u.handleAttributeSet);
processor.addEventHandler(Unique.setAttribute, u.handleAttributeSet);
processor.addEventHandler(Unique.burn, u.handleTokenBurn);
processor.addEventHandler(Unique.forceCreateClass, u.handleForceCollectionCreate);
// processor.addEventHandler(Unique.freezeClass, dummy);
processor.addEventHandler(Unique.clearClassMetadata, u.handleMetadataSet);
processor.addEventHandler(Unique.setClassMetadata, u.handleMetadataSet);
// processor.addEventHandler(Unique.thawClass, dummy);
// processor.addEventHandler(Unique.freezeCollection, dummy);
processor.addEventHandler(Unique.setCollectionMaxSupply, u.handleCollectionLock);
processor.addEventHandler(Unique.clearCollectionMetadata, u.handleMetadataSet);
processor.addEventHandler(Unique.setCollectionMetadata, u.handleMetadataSet);
processor.addEventHandler(Unique.thawCollection, dummy);
processor.addEventHandler(Unique.destroyCollection, u.handleCollectionDestroy);
// processor.addEventHandler(Unique.freeze, dummy);
processor.addEventHandler(Unique.createItem, u.handleTokenCreate);
processor.addEventHandler(Unique.sold, u.handleTokenBuy);
processor.addEventHandler(Unique.clearPrice, u.handleTokenList);
processor.addEventHandler(Unique.setPrice, u.handleTokenList);
processor.addEventHandler(Unique.clearMetadata, u.handleMetadataSet);
processor.addEventHandler(Unique.setMetadata, u.handleMetadataSet);
processor.addEventHandler(Unique.changeIssuer, u.handleCollectionOwnerChange);
// processor.addEventHandler(Unique.changeOwnershipAcceptance, dummy);
processor.addEventHandler(Unique.changeTeam, u.handleCollectionTeamChange);
// processor.addEventHandler(Unique.thaw, dummy);
processor.addEventHandler(Unique.transfer, u.handleTokenTransfer);

/**
 * NonFungibles nft pallet
*/
processor.addEventHandler(NonFungible.createCollection, n.handleCollectionCreate);
processor.addEventHandler(NonFungible.clearAttribute, n.handleAttributeSet);
processor.addEventHandler(NonFungible.setAttribute, n.handleAttributeSet);
processor.addEventHandler(NonFungible.burn, n.handleTokenBurn);

// Changed
processor.addEventHandler(NonFungible.forceCreateCollection, n.handleForceCollectionCreate);
// processor.addEventHandler(NonFungible.freezeClass, dummy);
processor.addEventHandler(NonFungible.clearCollectionMetadata, n.handleMetadataSet);
processor.addEventHandler(NonFungible.setCollectionMetadata, n.handleMetadataSet);
// end changed
// processor.addEventHandler(NonFungible.thawClass, dummy);
// processor.addEventHandler(NonFungible.freezeCollection, dummy);
processor.addEventHandler(NonFungible.setCollectionMaxSupply, n.handleCollectionLock);
processor.addEventHandler(NonFungible.clearCollectionMetadata, n.handleMetadataSet);
processor.addEventHandler(NonFungible.setCollectionMetadata, n.handleMetadataSet);
processor.addEventHandler(NonFungible.thawCollection, dummy);
processor.addEventHandler(NonFungible.destroyCollection, n.handleCollectionDestroy);
// processor.addEventHandler(NonFungible.freeze, dummy);
processor.addEventHandler(NonFungible.createItem, n.handleTokenCreate);
processor.addEventHandler(NonFungible.sold, n.handleTokenBuy);
processor.addEventHandler(NonFungible.clearPrice, n.handleTokenList);
processor.addEventHandler(NonFungible.setPrice, n.handleTokenList);
processor.addEventHandler(NonFungible.clearMetadata, n.handleMetadataSet);
processor.addEventHandler(NonFungible.setMetadata, n.handleMetadataSet);
processor.addEventHandler(NonFungible.changeIssuer, n.handleCollectionOwnerChange);
// processor.addEventHandler(NonFungible.changeOwnershipAcceptance, dummy);
processor.addEventHandler(NonFungible.changeTeam, n.handleCollectionTeamChange);
// processor.addEventHandler(NonFungible.thaw, dummy);
processor.addEventHandler(NonFungible.transfer, n.handleTokenTransfer);

logger.info(`PROCESSING ~~ ${CHAIN.toUpperCase()} ~~ EVENTS`);

processor.run();