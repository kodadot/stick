import { Arg, Query, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'
import { GroupedNFTEntity } from '../model/groupedNftEntity.model'

@Resolver()
export class GroupedNFTResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => [GroupedNFTEntity])
  async groupedNftEntities(
    @Arg('first', { nullable: true, defaultValue: null }) first: number,
    @Arg('offset', { nullable: true, defaultValue: 0 }) offset: number,
    @Arg('burned', { nullable: true, defaultValue: false }) burned: boolean,
    @Arg('search', () => String, { nullable: true }) search: string,
    @Arg('denyList', () => [String], { nullable: true }) denyList: string[]
  ): Promise<GroupedNFTEntity[]> {
    let denyListSQL = ''

    if (denyList && denyList.length > 0) {
      denyListSQL = `AND nft.issuer NOT IN (${denyList.map((_, i) => `$${i + 5}`).join(', ')})`
    }
    const query = ` 
    WITH grouped AS (
      SELECT nft.*, 
          COUNT(*) OVER (PARTITION BY nft.metadata) as copies,
          ROW_NUMBER() OVER (PARTITION BY nft.metadata ORDER BY nft.id) as rn
      FROM nft_entity nft
      WHERE nft.burned = $3
      AND nft.name ILIKE $4
      ${denyListSQL}
    )
    SELECT * FROM grouped WHERE rn = 1
    OFFSET $2
    LIMIT $1`

    const manager = await this.tx()
    const result: GroupedNFTEntity[] = await manager.query(query, [first, offset, burned, `%${search}%`, ...denyList])

    return result
  }
}
