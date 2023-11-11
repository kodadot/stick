import md5 from 'md5'
import { NFTEntity as NE } from '../../../model'
import { warn } from '../../utils/logger'
import { CHAIN } from '../../../environment'

export const OPERATION = 'TokenEntity' as any

export function generateTokenId(collectionId: string, nftMedia: string): string {
  return `${collectionId}-${md5(nftMedia)}`
}

export const mediaOf = (nft: NE): string | undefined => {
  const nftMedia = nft.image ?? nft.media

  if (!nftMedia || nftMedia === '') {
    warn(OPERATION, `MISSING NFT MEDIA ${nft.id}`)
    return undefined
  }

  return nftMedia
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

  const doNotAlter = collectionsToKeepNameAsIs[CHAIN].includes(collectionId)

  return doNotAlter ? nftName : nftName.replace(/([#_]\d+$)/g, '')
}
