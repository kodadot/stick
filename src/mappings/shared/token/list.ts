import { getWith } from '@kodadot1/metasquid/entity'
import { Context } from '../../utils/types'
import { NFTEntity as NE, TokenEntity as TE } from '../../../model'
import { warn } from '../../utils/logger'
import { OPERATION, mediaOf } from './utils'

export async function listHandler(context: Context, nft: NE): Promise<TE | undefined> {
  const nftMedia = mediaOf(nft)
  if (!nftMedia) {
    return
  }

  try {
    const nftWithToken = await getWith(context.store, NE, nft.id, { token: true })
    if (!nftWithToken.token) {
      warn(OPERATION, `nft ${nft.id} is not linked to a token`)
      return
    }
    const cheapest = nftWithToken.token.cheapest
    if (!nft.price && !cheapest?.price) {
      return
    }

    if (!cheapest?.price || (nft.price && nft.price < cheapest.price)) {
      context.store.update(TE, nftWithToken.token.id, { cheapest: nft, updatedAt: nft.updatedAt })
    }
  } catch (error) {
    warn(OPERATION, `ERROR ${error}`)
  }
}
