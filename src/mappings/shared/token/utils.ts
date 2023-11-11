import md5 from 'md5'
import { NFTEntity as NE } from '../../../model'
import { warn } from '../../utils/logger'

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

const doNotAlter = ['chained']

export const tokenName = (nftName: string | undefined | null): string => {
  if (typeof nftName !== 'string') {
    return ''
  }

  const trimmed = nftName.trim()
  // Check if nftName starts with any of the entries in doNotAlter
  const shouldNotAlter = doNotAlter
  .some((prefix) => trimmed.toLowerCase().startsWith(prefix))

  return shouldNotAlter ? trimmed : trimmed.replace(/([#_]\d+$)/g, '')
}
