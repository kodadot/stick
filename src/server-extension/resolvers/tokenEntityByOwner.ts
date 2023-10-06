/* eslint-disable camelcase */
import { Arg, Query, Resolver } from 'type-graphql'
import { EntityManager } from 'typeorm'
import { OrderBy, TokenEntityByOwner, TokenEntityByOwnerQueryResult } from '../model/tokenEntity.model'
import { makeQuery } from '../utils'
import { tokenEntityByOwner } from '../query/tokenEntityByOwner'
import { TokenEntity } from '../../model/generated'

@Resolver()
export class TokenResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => [TokenEntityByOwner])
  async tokenEntitiesByOwner(
    @Arg('owner', { nullable: false }) owner: string,
    @Arg('limit', { nullable: true }) limit?: number,
    @Arg('offset', { nullable: true, defaultValue: 0 }) offset?: number,
    @Arg('orderBy', { nullable: true, defaultValue: OrderBy.blockNumber_DESC }) orderBy?: OrderBy,
    @Arg('price_gte', { nullable: true }) price_gte?: number,
    @Arg('price_gt', { nullable: true }) price_gt?: number,
    @Arg('price_lte', { nullable: true }) price_lte?: number
  ): Promise<TokenEntityByOwner[]> {
    const orderQuery = this.getOrderByQuery(orderBy)

    const result: TokenEntityByOwnerQueryResult[] = await makeQuery(this.tx, TokenEntity, tokenEntityByOwner, [
      owner,
      limit,
      offset,
      orderQuery,
      price_gte,
      price_gt,
      price_lte,
    ])
    return result.map((row) => ({
      ...row,
      cheapestNFT: {
        id: row.cheapestNFTId,
        price: row.cheapestNFTPrice,
      },
      collection: {
        id: row.collectionId,
        name: row.collectionName,
      },
      meta: {
        id: row.metaId,
        description: row.metaDescription,
        animationUrl: row.metaAnimationUrl,
        image: row.metaImage,
      }
    }))
  }

  private getOrderByQuery(orderBy?: OrderBy): string {
    switch (orderBy) {
      case OrderBy.blockNumber_ASC:
        return 't.block_number ASC'
      case OrderBy.blockNumber_DESC:
        return 't.block_number DESC'
      case OrderBy.createdAt_ASC:
        return 't.created_at ASC'
      case OrderBy.createdAt_DESC:
        return 't.created_at DESC'
      case OrderBy.updatedAt_ASC:
        return 't.updated_at ASC'
      case OrderBy.updatedAt_DESC:
        return 't.updated_at DESC'
      case OrderBy.price_ASC:
        return 'c."cheapestNFTPrice" ASC'
      case OrderBy.price_DESC:
        return 'c."cheapestNFTPrice" DESC'
      default:
        return 't.block_number DESC'
    }
  }
}
