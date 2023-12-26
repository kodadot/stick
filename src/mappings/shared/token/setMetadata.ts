import * as fs from 'node:fs'
import { join } from 'node:path'
import { getOptional, getWith, findWhere } from '@kodadot1/metasquid/entity'
import { Context } from '../../utils/types'
import { CollectionEntity as CE, NFTEntity as NE, TokenEntity as TE } from '../../../model'
import { debug, warn } from '../../utils/logger'
import { OPERATION, generateTokenId, mediaOf } from './utils'
import { TokenAPI } from './tokenAPI'

export function writeToLogFile(message: any) {
  const BASE_DIR = '.'
  const logFilePath = join(BASE_DIR, 'log.txt')
  const logMessage = typeof message === 'string' ? message : JSON.stringify(message, null, 2)
  fs.appendFileSync(logFilePath, logMessage + '\n')
}
export async function setMetadataOnNftHandler(context: Context, collection: CE, nft: NE): Promise<TE | undefined> {
  debug(OPERATION, { handleMetadataSet: `Handle set metadata for NFT ${nft.id}` })
  const nftMedia = mediaOf(nft)
  if (!nftMedia) {
    // if (collection.id === 'u-8') {
    //   writeToLogFile({
    //     operation: 'setMetadataOnNftHandler',
    //     message: 'Early return due to missing nftMedia',
    //     nftId: nft.id,
    //   })
    // }
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

export async function setMetadataOnCollectionHandler(context: Context, collection: CE): Promise<TE | undefined> {
  debug(OPERATION, { handleMetadataSet: `Handle set metadata for collection ${collection.id}` })

  const collectionMedia = mediaOf(collection)

  if (!collectionMedia) {
    debug(OPERATION, { 'return early': 'missing collectionMedia' })
    if (collection.id === 'u-8') {
      writeToLogFile({
        timestamp: new Date().toISOString(),
        operation: 'Collection Media Check',
        collectionId: collection.id,
        message: 'Missing collection media',
      })
    }
    return
  }

  const nfts = await findWhere(context.store, NE, { collection: { id: collection.id }, token: undefined })
  if (nfts.length === 0) {
    return
  }

  const tokenApi = new TokenAPI(context.store)
  const firstNft = nfts[0]
  const remainingNfts = nfts.slice(1)

  const tokenId = generateTokenId(collection.id, collectionMedia)

  const existingToken = await getOptional<TE>(context.store, TE, tokenId)
  if (collection.id === 'u-8') {
    writeToLogFile({
      tokenId,
      collectionId: collection.id,
      collectionMedia,
      timestamp: new Date().toISOString(),
      operation: 'Before Token Creation/Addition',

      existingToken: existingToken ? 'Yes' : 'No',
      action: existingToken ? 'Add to Token' : 'Create Token',
      firstNftName: firstNft.name,
    })
  }
  const token = await (existingToken
    ? tokenApi.addNftToToken(firstNft, existingToken)
    : tokenApi.create(collection, firstNft, 'COLLECTION'))
  if (collection.id === 'u-8') {
    writeToLogFile({
      timestamp: new Date().toISOString(),
      operation: 'After Token Creation/Addition',
      tokenId: token ? token.id : 'Token creation failed',
      remainingNftsCount: remainingNfts.length,
    })
  }
  await tokenApi.addNftToToken(remainingNfts, token as TE)
  return token
}
