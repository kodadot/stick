import md5 from 'md5'
import { emOf } from '@kodadot1/metasquid/entity'
import { Store } from '@subsquid/typeorm-store'
import { NFTEntity as NE, TokenEntity as TE } from '../../../model'
import { warn, debug } from '../../utils/logger'
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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const attemptDelete = async (store: Store, tokenId: string, attempt = 1, maxAttempts = 3) => {
  try {
    // Attempt to delete the token
    await emOf(store).delete(TE, tokenId)
    debug(OPERATION, { deleteTokenSuccess: `Successfully deleted token ${tokenId}.` })
  } catch (error) {
    // Check if the maximum number of attempts has been reached
    if (attempt >= maxAttempts) {
      // Log final failure after reaching the max attempts
      debug(OPERATION, {
        finalDeleteTokenFailure: `Failed to delete token ${tokenId} after ${maxAttempts} attempts.`,
        error,
      })
    } else {
      // Calculate wait time for exponential backoff
      const waitTime = Math.pow(2, attempt) * 500
      debug(OPERATION, {
        retryDeleteToken: `Attempt ${attempt}: Failed to delete token ${tokenId}. Retrying in ${
          waitTime / 1000
        } seconds...`,
        error,
      })

      // Wait before retrying
      await sleep(waitTime)

      // Recursively try to delete again with incremented attempt count
      await attemptDelete(store, tokenId, attempt + 1, maxAttempts)
    }
  }
}
