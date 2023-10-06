import { create, getOptional, getWith } from '@kodadot1/metasquid/entity'
import md5 from 'md5'
import { CollectionEntity as CE, NFTEntity as NE, TokenEntity as TE } from '../../model'
import { debug, warn } from '../utils/logger'
import { Context } from '../utils/types'

const OPERATION = 'TokenEntity' as any

function generateTokenId(collectionId: string, nftMedia: string): string {
  return `${collectionId}-${md5(nftMedia)}`
}

async function createToken(context: Context, collection: CE, nft: NE): Promise<TE | undefined> {
  const nftMedia = nft.image ?? nft.media
  if (!nftMedia || nftMedia === '') {
    warn(OPERATION, `MISSING NFT MEDIA ${nft.id}`)
    return
  }
  const tokenId = generateTokenId(collection.id, nftMedia)
  debug(OPERATION, { createToken: `Create TOKEN ${tokenId} for NFT ${nft.id}` })
  const tokenName = typeof nft.name === 'string' ? nft.name?.replace(/([#_]\d+$)/g, '').trim() : ''

  const token = create(TE, tokenId, {
    createdAt: nft.createdAt,
    collection,
    name: tokenName,
    count: 1,
    hash: md5(tokenId),
    image: nft.image,
    media: nft.media,
    metadata: nft.metadata,
    meta: nft.meta,
    blockNumber: nft.blockNumber,
    updatedAt: nft.updatedAt,
    id: tokenId,
  })

  nft.token = token
  await context.store.save(token)
  await context.store.save(nft)

  return token
}

async function addNftToToken(context: Context, nft: NE, token: TE): Promise<TE> {
  debug(OPERATION, { updateToken: `Add NFT ${nft.id} to TOKEN ${token.id} for ` })
  token.count += 1
  token.updatedAt = nft.updatedAt
  nft.token = token
  await context.store.save(token)
  await context.store.save(nft)

  return token
}

async function removeNftFromToken(context: Context, nft: NE, token: TE): Promise<void> {
  if (!token) {
    return
  }
  debug(OPERATION, { removeNftFromToken: `Unlink NFT ${nft.id} from  TOKEN ${token.id}` })

  await context.store.update(NE, nft.id, { token: null })
  const updatedCount = token.count - 1
  await context.store.update(TE, token.id, { count: updatedCount, updatedAt: nft.updatedAt })

  if (updatedCount === 0) {
    debug(OPERATION, { deleteEmptyToken: `delete empty token ${token.id}` })
    
    await context.store.delete(TE, token.id)
  }
}

async function mintHandler(context: Context, collection: CE, nft: NE): Promise<TE | undefined> {
  const nftMedia = nft.image ?? nft.media
  debug(OPERATION, { mintHandler: `Handle mint for NFT ${nft.id}` })

  if (!nftMedia || nftMedia === '') {
    warn(OPERATION, `MISSING NFT MEDIA ${nft.id}`)
    return
  }

  const existingToken = await getOptional<TE>(context.store, TE, generateTokenId(collection.id, nftMedia))
  return await (existingToken ? addNftToToken(context, nft, existingToken) : createToken(context, collection, nft))
}

async function handleMetadataSet(context: Context, collection: CE, nft: NE): Promise<TE | undefined> {
  debug(OPERATION, { handleMetadataSet: `Handle set metadata for NFT ${nft.id}` })
  const nftMedia = nft.image ?? nft.media

  if (!nftMedia || nftMedia === '') {
    warn(OPERATION, `MISSING NFT MEDIA ${nft.id}`)
    return
  }

  let nftWithToken, existingToken
  try {
    [nftWithToken, existingToken] = await Promise.all([
      getWith(context.store, NE, nft.id, { token: true }),
      getOptional<TE>(context.store, TE, generateTokenId(collection.id, nftMedia)),
    ])
  } catch (error) {
    warn(OPERATION, `ERROR ${error}`)
    return
  }
  if (nftWithToken.token) {
    await removeNftFromToken(context, nft, nftWithToken.token)
  }
  return await (existingToken ? addNftToToken(context, nft, existingToken) : createToken(context, collection, nft))
}

async function handleBurn(context: Context, nft: NE): Promise<void> {
  debug(OPERATION, { handleBurn: `Handle Burn for NFT ${nft.id}` })
  const nftMedia = nft.image ?? nft.media

  if (!nftMedia || nftMedia === '') {
    warn(OPERATION, `MISSING NFT MEDIA ${nft.id}`)
    return
  }

  const token = await getOptional<TE>(context.store, TE, generateTokenId(nft.collection.id, nftMedia))

  if (!token) {
    return
  }

  debug(OPERATION, { BURN: `decrement Token's ${token.id} count` })

  await context.store.update(TE, token.id, { count: token.count - 1, updatedAt: nft.updatedAt })
}

async function listHandler(context: Context, nft: NE): Promise<TE | undefined> {
  const nftMedia = nft.image ?? nft.media

  if (!nftMedia || nftMedia === '') {
    warn(OPERATION, `MISSING NFT MEDIA ${nft.id}`)
    return
  }

  try {
    const nftWithToken = await getWith(context.store, NE, nft.id, { token: true })
    if (!nftWithToken.token) {
      warn(OPERATION, `nft ${nft.id} is not linked to a token`)
      return
    }
    const cheapestNFT = nftWithToken.token.cheapestNFT
    if (!nft.price && !cheapestNFT?.price) {
      return;
  }

    if (!cheapestNFT?.price || (nft.price && nft.price < cheapestNFT.price)) {
      context.store.update(TE, nftWithToken.token.id, { cheapestNFT: nft, updatedAt: nft.updatedAt })
    }
  } catch (error) {
    warn(OPERATION, `ERROR ${error}`)
  }
}


export const eventHandlers = {
  setMetadataHandler: handleMetadataSet,
  mintHandler,
  burnHandler: handleBurn,
  listHandler
}
