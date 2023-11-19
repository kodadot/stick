import { lookupArchive } from '@subsquid/archive-registry'

export const CHAIN = process.env.CHAIN || 'kusama'

// Asset Hub
const ARCHIVE_URL = lookupArchive(`asset-hub-${CHAIN}`, { release: 'ArrowSquid' })
const NODE_URL = `wss://${CHAIN}-asset-hub-rpc.polkadot.io`

// Statemint
// const DEV_ARCHIVE_URL = lookupArchive('statemint', { release: 'FireSquid' })
// const DEV_NODE_URL = 'wss://statemint-rpc.polkadot.io'

export const isProd = CHAIN !== 'rococo'

console.log(`Using ${CHAIN} chain ${isProd ? 'production' : 'development'} environment`)

export const getArchiveUrl = (): string => ARCHIVE_URL
export const getNodeUrl = (): string => NODE_URL
