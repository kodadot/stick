import { emOf } from '@kodadot1/metasquid/entity'
import { logger } from '@kodadot1/metasquid/logger'
import { Store } from './types'

const dirtyCollectionIds = new Set<string>()

const RARITY_TIER = {
  LEGENDARY: 'LEGENDARY',
  EPIC: 'EPIC',
  RARE: 'RARE',
  UNCOMMON: 'UNCOMMON',
  COMMON: 'COMMON',
} as const

type RarityTier = typeof RARITY_TIER[keyof typeof RARITY_TIER]

type AttributeRow = {
  trait?: string | null
  value?: string | null
}

type CollectionTokenRow = {
  id: string
  sn: string | number | bigint
  attributes?: AttributeRow[] | null
}

type RankedToken = {
  id: string
  sn: bigint
  rarityScore: number
  rarityRank: number | null
  rarityPercentile: number | null
  rarityTier: RarityTier
}

function asSn(sn: string | number | bigint): bigint {
  if (typeof sn === 'bigint') {
    return sn
  }

  if (typeof sn === 'number') {
    return BigInt(sn)
  }

  try {
    return BigInt(sn)
  } catch {
    return BigInt(0)
  }
}

function attributeKey(attribute: AttributeRow): string | null {
  const trait = attribute.trait?.trim()
  const value = attribute.value?.trim()

  if (!trait || !value) {
    return null
  }

  return `${trait}::${value}`
}

export function rarityTierFromPercentile(percentile: number): RarityTier {
  if (percentile < 1) {
    return RARITY_TIER.LEGENDARY
  }
  if (percentile < 5) {
    return RARITY_TIER.EPIC
  }
  if (percentile < 15) {
    return RARITY_TIER.RARE
  }
  if (percentile < 35) {
    return RARITY_TIER.UNCOMMON
  }

  return RARITY_TIER.COMMON
}

export function calculateCollectionRarity(tokens: CollectionTokenRow[]): RankedToken[] {
  const total = tokens.length
  if (!total) {
    return []
  }

  const traitCounts = new Map<string, number>()
  for (const token of tokens) {
    for (const attribute of token.attributes || []) {
      const key = attributeKey(attribute)
      if (!key) {
        continue
      }
      traitCounts.set(key, (traitCounts.get(key) || 0) + 1)
    }
  }

  const scored = tokens.map((token) => {
    const validTraits = (token.attributes || [])
      .map(attributeKey)
      .filter((key): key is string => key !== null)

    if (!validTraits.length) {
      return {
        id: token.id,
        sn: asSn(token.sn),
        rarityScore: 0,
        hasValidTraits: false,
      }
    }

    const rarityScore = validTraits.reduce((score, key) => {
      const traitCount = traitCounts.get(key)
      if (!traitCount) {
        return score
      }

      return score + total / traitCount
    }, 0)

    return {
      id: token.id,
      sn: asSn(token.sn),
      rarityScore: Number(rarityScore.toFixed(8)),
      hasValidTraits: true,
    }
  })

  const hasAnyTraitBearingNft = scored.some(token => token.hasValidTraits)

  scored.sort((a, b) => {
    if (b.rarityScore !== a.rarityScore) {
      return b.rarityScore - a.rarityScore
    }
    if (a.sn !== b.sn) {
      return a.sn < b.sn ? -1 : 1
    }
    return a.id.localeCompare(b.id)
  })

  if (!hasAnyTraitBearingNft) {
    return scored.map(token => ({
      id: token.id,
      sn: token.sn,
      rarityScore: 0,
      rarityRank: null,
      rarityPercentile: null,
      rarityTier: RARITY_TIER.COMMON,
    }))
  }

  return scored.map((token, index) => {
    const rarityRank = index + 1
    const rarityPercentile = Number((((rarityRank - 1) / total) * 100).toFixed(6))
    const rarityTier = !token.hasValidTraits
      ? RARITY_TIER.COMMON
      : rarityTierFromPercentile(rarityPercentile)

    return {
      id: token.id,
      sn: token.sn,
      rarityScore: token.rarityScore,
      rarityRank,
      rarityPercentile,
      rarityTier,
    }
  })
}

export function markCollectionRarityDirty(collectionId: string | null | undefined): void {
  if (!collectionId) {
    return
  }

  dirtyCollectionIds.add(String(collectionId))
}

async function updateCollectionRarity(store: Store, collectionId: string): Promise<void> {
  const rows = await emOf(store).query(
    `
      SELECT id, sn, attributes
      FROM nft_entity
      WHERE collection_id = $1
        AND burned = false
    `,
    [collectionId],
  ) as CollectionTokenRow[]

  const rankedTokens = calculateCollectionRarity(rows)
  if (!rankedTokens.length) {
    return
  }

  const batchSize = 2000
  for (let index = 0; index < rankedTokens.length; index += batchSize) {
    const chunk = rankedTokens.slice(index, index + batchSize)

    const values = chunk
      .map((_, chunkIndex) => {
        const base = chunkIndex * 5
        return `($${base + 1}::text, $${base + 2}::numeric, $${base + 3}::integer, $${base + 4}::numeric, $${base + 5}::text)`
      })
      .join(', ')

    const params: Array<string | number | null> = chunk.flatMap(token => [
      token.id,
      token.rarityScore,
      token.rarityRank,
      token.rarityPercentile,
      token.rarityTier,
    ])

    await emOf(store).query(
      `
        UPDATE nft_entity AS ne
        SET rarity_score = v.rarity_score,
            rarity_rank = v.rarity_rank,
            rarity_percentile = v.rarity_percentile,
            rarity_tier = v.rarity_tier
        FROM (VALUES ${values}) AS v(id, rarity_score, rarity_rank, rarity_percentile, rarity_tier)
        WHERE ne.id = v.id
      `,
      params,
    )
  }
}

export async function flushDirtyCollectionRarity(store: Store): Promise<void> {
  if (!dirtyCollectionIds.size) {
    return
  }

  const collectionIds = Array.from(dirtyCollectionIds)
  dirtyCollectionIds.clear()

  for (const collectionId of collectionIds) {
    try {
      await updateCollectionRarity(store, collectionId)
    } catch (error) {
      logger.error(
        `[RARITY] Failed to update collection ${collectionId}: ${(error as Error).message}`,
      )
      throw error
    }
  }
}
