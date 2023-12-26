import { lookupArchive } from '@subsquid/archive-registry'

export const CHAIN = 'statemint'

// Statemine
const ARCHIVE_URL = lookupArchive('statemine', { release: 'FireSquid' })
const NODE_URL = 'wss://statemine-rpc.polkadot.io'

// Statemint
const DEV_ARCHIVE_URL = lookupArchive('statemint', { release: 'FireSquid' })
const DEV_NODE_URL = 'wss://statemint-rpc.polkadot.io'

export const isProd = false
console.log(`Using ${CHAIN} chain ${isProd ? 'production' : 'development'} environment`)

export const getArchiveUrl = (): string => (isProd ? ARCHIVE_URL : DEV_ARCHIVE_URL)
export const getNodeUrl = (): string => (isProd ? NODE_URL : DEV_NODE_URL)
