import md5 from 'md5'
import { NFTEntity as NE } from '../../../model'
import { warn } from '../../utils/logger'
import { CHAIN } from '../../../environment'

export const OPERATION = 'TokenEntity' as any

export function generateTokenId(collectionId: string, nft: NE): string | undefined {
  if (!nft.image && !nft.media) {
    warn(OPERATION, `MISSING NFT MEDIA ${nft.id}`)
    return undefined
  }
  const image = nft.image ?? ''
  const media = nft.media ?? ''
  return `${collectionId}-${md5(image)}:${md5(media)}`
}

export const collectionsToKeepNameAsIs: Record<string, string[]> = {
  statemine: [
    '176', // chained - generative art
  ],
}

export const tokenName = (nftName: string | undefined | null, collectionId: string): string => {
  if (typeof nftName !== 'string') {
    return ''
  }

  const doNotAlter = collectionsToKeepNameAsIs[CHAIN]?.includes(collectionId)

  return doNotAlter ? nftName : nftName.replace(/([#_]\d+$)/g, '')
}

