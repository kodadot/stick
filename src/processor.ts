import { SubstrateProcessor } from "@subsquid/substrate-processor"
import { FullTypeormDatabase as Database } from '@subsquid/typeorm-store'
import logger from './mappings/utils/logger'
import { Unique } from './processable'

import { getArchiveUrl, getNodeUrl, CHAIN } from './environment'
import * as u from './mappings/uniques'

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

logger.info(`PROCESSING ~~ ${CHAIN.toUpperCase()} ~~ EVENTS`);

processor.run();