import { getOptional, getWith, findWhere } from '@kodadot1/metasquid/entity'
import { Context } from '../../utils/types'
import { CollectionEntity as CE, NFTEntity as NE, TokenEntity as TE } from '../../../model'
import { debug, warn } from '../../utils/logger'
import { OPERATION, generateTokenId, mediaOf } from './utils'
import { TokenAPI } from './tokenAPI'

export async function setMetadataHandler(context: Context, collection: CE, nft: NE): Promise<TE | undefined> {
  debug(OPERATION, { handleMetadataSet: `Handle set metadata for NFT ${nft.id}` })
  const nftMedia = mediaOf(nft) ?? mediaOf(collection)
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

export async function setMetadataOnCollectionHandler(context: Context, collection: CE): Promise<TE[] | undefined> {
  debug(OPERATION, { handleMetadataSet: `Handle set metadata for collection ${collection.id}` })

  const collectionMedia = mediaOf(collection)

  if (!collectionMedia) {
    debug(OPERATION, { 'return early': 'missing collectionMedia' })
    return
  }

  const nfts = await findWhere(context.store, NE, { collection: { id: collection.id }, token: undefined })
  if (nfts.length === 0) {
    return
  }

  const tokenApi = new TokenAPI(context.store)
  const firstNft = nfts.splice(0, 1)[0]

  const existingToken = await getOptional<TE>(context.store, TE, generateTokenId(collection.id, collectionMedia))
  const token = await (existingToken
    ? tokenApi.addNftToToken(firstNft, existingToken)
    : tokenApi.create(collection, firstNft))

  if (!token) {
    // debug return early
    debug(OPERATION, { 'return early': 'failed to find/create tokenEntity' })
    return undefined
  }

  return Promise.all(nfts.map((nft) => tokenApi.addNftToToken(nft, token)))
}
