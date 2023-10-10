/* eslint-disable camelcase */
import { Arg, Int, Query, Resolver } from 'type-graphql'
import { EntityManager } from 'typeorm'
import { OrderBy, TokenEntityModel, TokenEntityQueryResult } from '../model/tokenEntity.model'
import { makeQuery } from '../utils'
import { tokenEntities } from '../query/tokenEntities'

@Resolver()
export class TokenResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => [TokenEntityModel])
  async tokenEntityList(
    @Arg('limit', () => Int, { nullable: false, defaultValue: 40 }) limit: number,

    @Arg('owner', { nullable: true }) owner?: string,
    @Arg('offset', () => Int, { nullable: true, defaultValue: 0 }) offset?: number,
    @Arg('orderBy', () => [String], { nullable: true, defaultValue: [OrderBy.blockNumber_DESC] }) orderBy?: string[],
    @Arg('price_gte', { nullable: true }) price_gte?: number,
    @Arg('price_gt', { nullable: true }) price_gt?: number,
    @Arg('price_lte', { nullable: true }) price_lte?: number,
    @Arg('denyList', () => [String], { nullable: true }) denyList?: string[]
  ): Promise<TokenEntityModel[]> {
    const orderQuery = this.getOrderByQuery(orderBy)

    const fullSQLQuery = `
${tokenEntities}
ORDER BY ${orderQuery} LIMIT $2 OFFSET $3;
`
    const result: TokenEntityQueryResult[] = await makeQuery(this.tx, TokenEntityModel, fullSQLQuery, [
      owner,
      limit,
      offset,
      price_gte,
      price_gt,
      price_lte,
      denyList,
    ])
    return result.map(this.mapRowToTokenEntityByOwner)
  }

  private mapRowToTokenEntityByOwner(row: TokenEntityQueryResult): TokenEntityModel {
    return {
      ...row,
      blockNumber: row.block_number,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      cheapest: {
        id: row.cheapest_id,
        price: row.cheapest_price,
      },
      collection: {
        id: row.collection_id,
        name: row.collection_name,
      },
      meta: {
        id: row.meta_id,
        description: row.meta_description,
        animationUrl: row.meta_animation_url,
        image: row.meta_image,
      },
    }
  }

  ORDER_BY_MAPPING: Record<string, string> = {
    [OrderBy.blockNumber_ASC]: 'block_number ASC',
    [OrderBy.blockNumber_DESC]: 'block_number DESC',
    [OrderBy.createdAt_ASC]: 'created_at ASC',
    [OrderBy.createdAt_DESC]: 'created_at DESC',
    [OrderBy.updatedAt_ASC]: 'updated_at ASC',
    [OrderBy.updatedAt_DESC]: 'updated_at DESC',
    [OrderBy.price_ASC]: 'cheapest_price ASC',
    [OrderBy.price_DESC]: 'cheapest_price DESC',
  }

  private getOrderByQuery(orderBy: string[] = [OrderBy.blockNumber_DESC]): string {
    return orderBy.map((order) => this.ORDER_BY_MAPPING[order]).join(', ')
  }
}
