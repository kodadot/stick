import { create as createEntity, get, getWith } from '@kodadot1/metasquid/entity'
import md5 from 'md5'
import { Store } from '../../utils/types'
import { CollectionEntity as CE, NFTEntity as NE, TokenEntity as TE } from '../../../model'
import { debug } from '../../utils/logger'
import { OPERATION, generateTokenId, mediaOf, tokenName } from './utils'
import { writeToLogFile } from './setMetadata'

export class TokenAPI {
  constructor(private store: Store) {}

  async create(collection: CE, nft: NE, eventOn: 'NFT' | 'COLLECTION' = 'NFT'): Promise<TE | undefined> {
    const nftMedia = mediaOf(eventOn === 'NFT' ? nft : collection)
    if (!nftMedia) {
      return
    }
    const tokenId = generateTokenId(collection.id, nftMedia)
    debug(OPERATION, { createToken: `Create TOKEN ${tokenId} for NFT ${nft.id}` })


    const sourceEntity = eventOn === 'NFT' ? nft : collection

    const token = createEntity(TE, tokenId, {
      createdAt: nft.createdAt,
      collection,
      name: tokenName(sourceEntity.name, collection.id),
      count: 1,
      supply: 1,
      hash: md5(tokenId),
      image: sourceEntity.image,
      media: sourceEntity.media,
      metadata: sourceEntity.metadata,
      meta: sourceEntity.meta,
      blockNumber: sourceEntity.blockNumber,
      updatedAt: sourceEntity.updatedAt,
      id: tokenId,
    })

    await this.store.save(token)
    // await this.store.update(TE, token.id, { meta: newMeta })
    const existingToken = await getWith(this.store, TE, tokenId, { meta: true })

    // log here
    if (collection.id === 'u-8') {
      writeToLogFile({
        timestamp: new Date().toISOString(),
        operation: 'Create Token - After Saving to DB',
        tokenId: existingToken.id,
        image: existingToken.image,
        metaImage: existingToken.meta?.image,
      })
    }

    await this.store.update(NE, nft.id, { token })

    return token
  }

  async removeNftFromToken(nft: NE, token: TE): Promise<void> {
    if (!token) {
      return
    }
    debug(OPERATION, { removeNftFromToken: `Unlink NFT ${nft.id} from  TOKEN ${token.id}` })

    await this.store.update(NE, nft.id, { token: null })
    const updatedCount = token.count - 1
    await this.store.update(TE, token.id, {
      supply: token.supply - 1,
      count: updatedCount,
      updatedAt: nft.updatedAt,
    })

    if (updatedCount === 0) {
      debug(OPERATION, { deleteEmptyToken: `delete empty token ${token.id}` })

      await this.store.delete(TE, token.id)
    }
  }

  async addNftToToken(nft: NE | NE[], token: TE): Promise<TE> {
    let nftsToUpdate = Array.isArray(nft) ? nft : [nft]
    if (nftsToUpdate.length === 0) {
      return token
    }
    // log token id and number of nfts to update
    if (token.id.startsWith('u-8')) {
      writeToLogFile({
        timestamp: new Date().toISOString(),
        operation: 'Add NFT to Token',
        tokenId: token.id,
        nftsToUpdate: nftsToUpdate.length,
      })
    }
    debug(OPERATION, { updateToken: `Adding ${nftsToUpdate.length} NFT(s) to TOKEN ${token.id}` })

    // Update token count and supply
    const updatedCount = token.count + nftsToUpdate.length
    const updatedSupply = token.supply + nftsToUpdate.length

    // Batch update NFT entities
    const nftUpdates = nftsToUpdate.map((nft) => ({ ...nft, token }))
    await this.store.save(NE, nftUpdates)

    // Save token changes
    await this.store.update(TE, token.id, {
      count: updatedCount,
      supply: updatedSupply,
      updatedAt: new Date().toISOString(),
    })

    // get first nft by id
    const firstNft = await getWith(this.store, NE, nftsToUpdate[0].id, { collection: true, token: true })

    // log nft.token.id
    if (firstNft.collection.id === 'u-8') {
      writeToLogFile({
        timestamp: new Date().toISOString(),
        operation: 'Add NFT to Token',
        tokenId: token.id,
        nftTokenId: firstNft.token?.id,
      })
    }

    return token
  }
}
