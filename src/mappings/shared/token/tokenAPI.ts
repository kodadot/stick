import { create as createEntity, emOf } from '@kodadot1/metasquid/entity'
import md5 from 'md5'
import { Store } from '../../utils/types'
import { CollectionEntity as CE, NFTEntity as NE, TokenEntity as TE } from '../../../model'
import { debug } from '../../utils/logger'
import { OPERATION, generateTokenId, tokenName } from './utils'

export class TokenAPI {
  constructor(private store: Store) {}

  async create(collection: CE, nft: NE): Promise<TE | undefined> {
    const tokenId = generateTokenId(collection.id, nft)
    if (!tokenId) {
      return
    }
    debug(OPERATION, { createToken: `Create TOKEN ${tokenId} for NFT ${nft.id}` })

    const token = createEntity(TE, tokenId, {
      createdAt: nft.createdAt,
      collection,
      name: tokenName(nft.name, collection.id),
      count: 1,
      supply: 1,
      hash: md5(tokenId),
      image: nft.image,
      media: nft.media,
      metadata: nft.metadata,
      meta: nft.meta,
      blockNumber: nft.blockNumber,
      updatedAt: nft.updatedAt,
      id: tokenId,
    })

    await this.store.save(token)
    await emOf(this.store).update(NE, nft.id, { token })

    return token
  }

  async removeNftFromToken(nft: NE, token: TE): Promise<void> {
    if (!token) {
      return
    }
    debug(OPERATION, { removeNftFromToken: `Unlink NFT ${nft.id} from  TOKEN ${token.id}` })

    await emOf(this.store).update(NE, nft.id, { token: null })
    const updatedCount = token.count - 1
    await emOf(this.store).update(TE, token.id, {
      supply: token.supply - 1,
      count: updatedCount,
      updatedAt: nft.updatedAt,
    })

    if (updatedCount === 0) {
      debug(OPERATION, { deleteEmptyToken: `delete empty token ${token.id}` })

      await emOf(this.store).delete(TE, token.id)
    }
  }

  async addNftToToken(nft: NE, token: TE): Promise<TE> {
    debug(OPERATION, { updateToken: `Add NFT ${nft.id} to TOKEN ${token.id} for ` })
    token.count += 1
    token.supply += 1
    token.updatedAt = nft.updatedAt
    nft.token = token
    await this.store.save(token)
    await this.store.save(nft)
    return token
  }
}
