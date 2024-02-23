import { getOptional } from '@kodadot1/metasquid/entity'
import { Context } from '../../utils/types'
import { CollectionEntity as CE, NFTEntity as NE, TokenEntity as TE } from '../../../model'
import { debug } from '../../utils/logger'
import { OPERATION, generateTokenId } from './utils'
import { TokenAPI } from './tokenAPI'

export async function mintHandler(context: Context, collection: CE, nft: NE): Promise<TE | undefined> {
  debug(OPERATION, { mintHandler: `Handle mint for NFT ${nft.id}` })

  const tokenId = generateTokenId(collection.id, nft)
  if (!tokenId) {
    return
  }

  const tokenApi = new TokenAPI(context.store)

  const existingToken = await getOptional<TE>(context.store, TE, tokenId)
  return await (existingToken ? tokenApi.addNftToToken(nft, existingToken) : tokenApi.create(collection, nft))
}
