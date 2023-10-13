/* eslint-disable camelcase */
import { Arg, Query, Resolver } from 'type-graphql'
import { EntityManager } from 'typeorm'
import { makeQuery } from '../utils'
import { totalTokenEntities } from '../query/totalTokenEntities'
import { CountEntity, CountEntityQueryResult } from '../model/count.model'

@Resolver()
export class TokenCountResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => CountEntity)
  async tokenEntityCount(
    @Arg('owner', { nullable: true }) owner?: string,
    @Arg('issuer', { nullable: true }) issuer?: string,
    @Arg('price_gte', { nullable: true }) price_gte?: number,
    @Arg('price_gt', { nullable: true }) price_gt?: number,
    @Arg('price_lte', { nullable: true }) price_lte?: number,
    @Arg('denyList', () => [String], { nullable: true }) denyList?: string[]
  ): Promise<CountEntity> {
    const rawData: CountEntityQueryResult[] = await makeQuery(this.tx, CountEntity, totalTokenEntities, [
      owner,
      price_gte,
      price_gt,
      price_lte,
      denyList,
      issuer,
    ])
    return new CountEntity(rawData[0].total_count)
  }
}
