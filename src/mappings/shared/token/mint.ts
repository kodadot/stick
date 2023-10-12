import { getOptional } from '@kodadot1/metasquid/entity'
import { Context } from '../../utils/types'
import { CollectionEntity as CE, NFTEntity as NE, TokenEntity as TE } from '../../../model'
import { debug } from '../../utils/logger'
import { OPERATION, generateTokenId, mediaOf } from './utils'
import { TokenAPI } from './tokenAPI'

export async function mintHandler(context: Context, collection: CE, nft: NE): Promise<TE | undefined> {
  debug(OPERATION, { mintHandler: `Handle mint for NFT ${nft.id}` })

  const nftMedia = mediaOf(nft)
  if (!nftMedia) {
    return
  }

  const tokenApi = new TokenAPI(context.store)

  const existingToken = await getOptional<TE>(context.store, TE, generateTokenId(collection.id, nftMedia))
  return await (existingToken ? tokenApi.addNftToToken(nft, existingToken) : tokenApi.create(collection, nft))
}
