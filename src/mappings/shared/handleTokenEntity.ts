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
  debug(OPERATION, { updateToken: `Update TOKEN ${token.id} for NFT ${nft.id}` })
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
  debug(OPERATION, { handleExistingToken: `Unlink TOKEN ${token.id} from  NFT ${nft.id}` })

  await context.store.update(NE, nft.id, { token: null })
  await context.store.update(TE, token.id, { count: token.count - 1, updatedAt: nft.updatedAt })

  const tokenNfts = (await getWith(context.store, TE, token.id, { nfts: true })).nfts
  if (tokenNfts.length === 0) {
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
  const nftMedia = nft.image ?? nft.media

  if (!nftMedia || nftMedia === '') {
    warn(OPERATION, `MISSING NFT MEDIA ${nft.id}`)
    return
  }
  try {
    const nftWithToken = await getWith(context.store, NE, nft.id, { token: true })
    const token = nftWithToken.token
    if (token) {
      debug(OPERATION, { removeNftFromToken: `removeNftFromToken TOKEN ${token.id} for NFT ${nft.id}` })
      await removeNftFromToken(context, nft, token)
    }
  } catch (error) {
    warn(OPERATION, `ERROR ${error}`)
  }
  const existingToken = await getOptional<TE>(context.store, TE, generateTokenId(collection.id, nftMedia))
  debug(OPERATION, { existingToken: `existingToken ${Boolean(existingToken)}` })
  return await (existingToken ? addNftToToken(context, nft, existingToken) : createToken(context, collection, nft))
}

async function handleBurn(context: Context, nft: NE): Promise<void> {
  const nftMedia = nft.image ?? nft.media

  if (!nftMedia || nftMedia === '') {
    warn(OPERATION, `MISSING NFT MEDIA ${nft.id}`)
    return
  }

  const token = await getOptional<TE>(context.store, TE, generateTokenId(nft.collection.id, nftMedia))

  if (!token) {
    return
  }

  debug(OPERATION, { handleBurn: `Handle burn for NFT ${nft.id}` })

  await context.store.update(TE, token.id, { count: token.count - 1, updatedAt: nft.updatedAt })
}

export const eventHandlers = {
  setMetadataHandler: handleMetadataSet,
  mintHandler,
  burnHandler: handleBurn,
}
