export type Chain = 'kusama' | 'rococo' | 'polkadot'

export const CHAIN: Chain = process.env.CHAIN as Chain || 'kusama'
export const COLLECTION_OFFER: string = process.env.OFFER || ''

export const UNIQUES_ENABLED = process.env.UNIQUES === 'true'
const UNIQUE_STARTING_BLOCK = 323_750 // 618838;
const NFT_STARTING_BLOCK = 4_556_552
export const STARTING_BLOCK = UNIQUES_ENABLED ? UNIQUE_STARTING_BLOCK : NFT_STARTING_BLOCK

// Asset Hub
const ARCHIVE_URL = `https://v2.archive.subsquid.io/network/asset-hub-${CHAIN}`
const NODE_URL = `wss://${CHAIN}-asset-hub-rpc.polkadot.io`

export const isProd = CHAIN !== 'rococo'

console.table({
  CHAIN, ARCHIVE_URL, NODE_URL, STARTING_BLOCK,
  COLLECTION_OFFER,
  UNIQUES_ENABLED,
  disabledRPC: false,
  environment: isProd ? 'production' : 'development',
})

export const getArchiveUrl = (): string => ARCHIVE_URL
export const getNodeUrl = (): string => NODE_URL
