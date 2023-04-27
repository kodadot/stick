import { lookupArchive } from "@subsquid/archive-registry"
import { SubstrateProcessor } from "@subsquid/substrate-processor"
import { FullTypeormDatabase as Database } from '@subsquid/typeorm-store'
import { Event } from './processable'

import * as mappings from './mappings/uniques';

const database = new Database();
const processor = new SubstrateProcessor(database);

const STARTING_BLOCK = 778425; // 6000 or 1790000 for Prod

processor.setTypesBundle('basilisk');
processor.setBlockRange({ from: STARTING_BLOCK });

const archive = lookupArchive('statemine', {release: 'FireSquid'} )
const chain = undefined

processor.setDataSource({
    archive,
    chain,
});

processor.addEventHandler(Event.createClass, mappings.handleCollectionCreate);