import { describe, expect, it } from 'vitest'
import { calculateCollectionRarity, rarityTierFromPercentile } from '../src/mappings/utils/rarity'

describe('Rarity', () => {
  it('calculates score and deterministic ranking', () => {
    const rows = calculateCollectionRarity([
      {
        id: '1-1',
        sn: 1,
        attributes: [{ trait: 'color', value: 'red' }],
      },
      {
        id: '1-2',
        sn: 2,
        attributes: [{ trait: 'color', value: 'red' }],
      },
      {
        id: '1-3',
        sn: 3,
        attributes: [{ trait: 'color', value: 'blue' }],
      },
      {
        id: '1-4',
        sn: 4,
        attributes: [],
      },
    ])

    expect(rows.map(row => row.id)).toEqual(['1-3', '1-1', '1-2', '1-4'])
    expect(rows.find(row => row.id === '1-3')?.rarityScore).toBe(4)
    expect(rows.find(row => row.id === '1-1')?.rarityScore).toBe(2)
    expect(rows.find(row => row.id === '1-4')?.rarityScore).toBe(0)
  })

  it('maps percentiles to tiers at exact boundaries', () => {
    expect(rarityTierFromPercentile(0.9999)).toBe('LEGENDARY')
    expect(rarityTierFromPercentile(1)).toBe('EPIC')
    expect(rarityTierFromPercentile(4.9999)).toBe('EPIC')
    expect(rarityTierFromPercentile(5)).toBe('RARE')
    expect(rarityTierFromPercentile(14.9999)).toBe('RARE')
    expect(rarityTierFromPercentile(15)).toBe('UNCOMMON')
    expect(rarityTierFromPercentile(34.9999)).toBe('UNCOMMON')
    expect(rarityTierFromPercentile(35)).toBe('COMMON')
  })

  it('assigns missing traits as common with zero score', () => {
    const rows = calculateCollectionRarity([
      { id: '2-1', sn: 1, attributes: [] },
      { id: '2-2', sn: 2, attributes: [{ trait: 'hat', value: 'cap' }] },
    ])

    const missing = rows.find(row => row.id === '2-1')
    expect(missing?.rarityScore).toBe(0)
    expect(missing?.rarityTier).toBe('COMMON')
  })

  it('forces common tier when collection has no valid traits', () => {
    const rows = calculateCollectionRarity([
      { id: '3-1', sn: 1, attributes: [] },
      { id: '3-2', sn: 2, attributes: [] },
      { id: '3-3', sn: 3, attributes: [] },
    ])

    expect(rows).toHaveLength(3)
    expect(rows.every(row => row.rarityScore === 0)).toBe(true)
    expect(rows.every(row => row.rarityTier === 'COMMON')).toBe(true)
    expect(rows.every(row => row.rarityRank === null)).toBe(true)
    expect(rows.every(row => row.rarityPercentile === null)).toBe(true)
  })

  it('keeps traitless NFTs common even when percentile would be uncommon', () => {
    const rows = calculateCollectionRarity([
      { id: '4-1', sn: 1, attributes: [{ trait: 'hat', value: 'cap' }] },
      { id: '4-2', sn: 2, attributes: [] },
      { id: '4-3', sn: 3, attributes: [] },
    ])

    const traitless = rows.filter(row => row.rarityScore === 0)
    expect(traitless).toHaveLength(2)
    expect(traitless.every(row => row.rarityTier === 'COMMON')).toBe(true)
  })
})
