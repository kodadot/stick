import { lookupArchive } from "@subsquid/archive-registry"
import { SubstrateProcessor } from "@subsquid/substrate-processor"
import { FullTypeormDatabase as Database } from '@subsquid/typeorm-store'
import { Event } from './processable'
import logger from './mappings/utils/logger';

import * as u from './mappings/uniques';

const database = new Database();
const processor = new SubstrateProcessor(database);

const STARTING_BLOCK = 323750; //618838;

processor.setTypesBundle('statemine')
processor.setBlockRange({ from: STARTING_BLOCK });

// const ARCHIVE = 'https://statemine.archive.subsquid.io/graphql';
const archive = lookupArchive('statemine', {release: 'FireSquid'} )
const chain = 'wss://statemine-rpc.polkadot.io'

processor.setDataSource({
    archive,
    chain,
});

const dummy = async () => {}

processor.addEventHandler(Event.createCollection, u.handleCollectionCreate);
processor.addEventHandler(Event.clearAttribute, dummy);
processor.addEventHandler(Event.setAttribute, dummy);
processor.addEventHandler(Event.burn, u.handleTokenBurn);
processor.addEventHandler(Event.forceCreateClass, u.handleForceCollectionCreate);
processor.addEventHandler(Event.freezeClass, dummy);
processor.addEventHandler(Event.clearClassMetadata, u.handleMetadataSet);
processor.addEventHandler(Event.setClassMetadata, u.handleMetadataSet);
processor.addEventHandler(Event.thawClass, dummy);
processor.addEventHandler(Event.freezeCollection, dummy);
processor.addEventHandler(Event.setCollectionMaxSupply, u.handleCollectionLock);
processor.addEventHandler(Event.clearCollectionMetadata, u.handleMetadataSet);
processor.addEventHandler(Event.setCollectionMetadata, u.handleMetadataSet);
processor.addEventHandler(Event.thawCollection, dummy);
processor.addEventHandler(Event.destroyCollection, u.handleCollectionDestroy);
processor.addEventHandler(Event.freeze, dummy);
processor.addEventHandler(Event.createItem, u.handleTokenCreate);
processor.addEventHandler(Event.sold, u.handleTokenBuy);
processor.addEventHandler(Event.clearPrice, u.handleTokenList);
processor.addEventHandler(Event.setPrice, u.handleTokenList);
processor.addEventHandler(Event.clearMetadata, u.handleMetadataSet);
processor.addEventHandler(Event.setMetadata, u.handleMetadataSet);
processor.addEventHandler(Event.changeIssuer, u.handleCollectionOwnerChange);
processor.addEventHandler(Event.changeOwnershipAcceptance, dummy);
processor.addEventHandler(Event.changeTeam, dummy);
processor.addEventHandler(Event.thaw, dummy);
processor.addEventHandler(Event.transfer, u.handleTokenTransfer);

logger.info('Welcome to the Processor! Statemine');

processor.run();