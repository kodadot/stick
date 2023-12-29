import { emOf, getOptional } from '@kodadot1/metasquid/entity'
import { Context } from '../../utils/types'
import { NFTEntity as NE, TokenEntity as TE } from '../../../model'
import { debug } from '../../utils/logger'
import { OPERATION, generateTokenId, mediaOf } from './utils'

export async function burnHandler(context: Context, nft: NE): Promise<void> {
  debug(OPERATION, { handleBurn: `Handle Burn for NFT ${nft.id}` })

  const nftMedia = mediaOf(nft)
  if (!nftMedia) {
    return
  }

  const token = await getOptional<TE>(context.store, TE, generateTokenId(nft.collection.id, nftMedia))

  if (!token) {
    return
  }

  debug(OPERATION, { BURN: `decrement Token's ${token.id} supply` })

  await emOf(context.store).update(TE, token.id, { supply: token.supply - 1, updatedAt: nft.updatedAt })
}
