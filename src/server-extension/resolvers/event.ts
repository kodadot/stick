import { Arg, Int, Query, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'
import { NFTEntity } from '../../model/generated'
import { LastEventEntity, LatestestEventsNFTEntity } from '../model/event.model'
import { lastEventQuery, latestestEventsNFTQuery } from '../query/event'
import { makeQuery } from '../utils'
import { Interaction } from '../../model'

@Resolver()
export class EventResolver {
  constructor(private tx: () => Promise<EntityManager>) { }

  @Query(() => [LastEventEntity])
  async lastEvent(
    @Arg('interaction', { nullable: true, defaultValue: Interaction.LIST }) interaction: Interaction,
    @Arg('limit', { nullable: true, defaultValue: 20 }) limit: number,
    @Arg('offset', { nullable: true, defaultValue: 0 }) offset: number
  ): Promise<[LastEventEntity]> {
    const result: [LastEventEntity] = await makeQuery(this.tx, NFTEntity, lastEventQuery, [interaction, limit, offset])
    return result
  }

  @Query(() => [LatestestEventsNFTEntity])
  async latestestEventsNfts(
    @Arg('limit', () => Int, { nullable: true, defaultValue: 10 }) limit: number,
    @Arg('collections', () => [String], { nullable: false }) collections?: string[],
  ): Promise<LatestestEventsNFTEntity[]> {
    const result: LatestestEventsNFTEntity[] = await makeQuery(this.tx, NFTEntity, latestestEventsNFTQuery, [collections, limit])
    return result
  }
}
