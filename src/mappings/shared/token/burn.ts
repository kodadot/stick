import { getWith } from '@kodadot1/metasquid/entity'
import { Context } from '../../utils/types'
import { NFTEntity as NE } from '../../../model'
import { debug, warn } from '../../utils/logger'
import { generateTokenId, OPERATION } from './utils'
import { TokenAPI } from './tokenAPI'

export async function burnHandler(context: Context, nft: NE): Promise<void> {
  debug(OPERATION, { handleBurn: `Handle Burn for NFT ${nft.id}` })

  const tokenId = generateTokenId(nft.collection.id, nft)
  if (!tokenId) {
    return
  }

  const tokenAPI = new TokenAPI(context.store)
  try {
    const nftWithToken = await getWith(context.store, NE, nft.id, {
      token: true,
    })
    if (nftWithToken?.token) {
      await tokenAPI.removeNftFromToken(nft, nftWithToken.token)
    }
  } catch (error) {
    warn(OPERATION, `ERROR ${error}`)
  }
}
