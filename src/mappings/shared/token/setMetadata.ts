import { getOptional, getWith } from '@kodadot1/metasquid/entity'
import { Context } from '../../utils/types'
import { CollectionEntity as CE, NFTEntity as NE, TokenEntity as TE } from '../../../model'
import { debug, warn } from '../../utils/logger'
import { OPERATION, generateTokenId, mediaOf } from './utils'
import { TokenAPI } from './tokenAPI'

export async function setMetadataHandler(context: Context, collection: CE, nft: NE): Promise<TE | undefined> {
  debug(OPERATION, { handleMetadataSet: `Handle set metadata for NFT ${nft.id}` })
  const nftMedia = mediaOf(nft)
  if (!nftMedia) {
    return
  }
  const tokenAPI = new TokenAPI(context.store)

  try {
    const nftWithToken = await getWith(context.store, NE, nft.id, { token: true })
    if (nftWithToken?.token) {
      await tokenAPI.removeNftFromToken(nft, nftWithToken.token)
    }
  } catch (error) {
    warn(OPERATION, `ERROR ${error}`)
    return
  }

  const existingToken = await getOptional<TE>(context.store, TE, generateTokenId(collection.id, nftMedia))
  return await (existingToken ? tokenAPI.addNftToToken(nft, existingToken) : tokenAPI.create(collection, nft))
}
