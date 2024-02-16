import { emOf } from '@kodadot1/metasquid/entity'
import { ArchiveCallWithOptionalValue, Store } from '@kodadot1/metasquid/types'
import * as ss58 from '@subsquid/ss58'
import { decodeHex } from '@subsquid/substrate-processor'
import { CHAIN } from '../../environment'
import { Context, SomethingWithOptionalMeta } from './types'


const codec = CHAIN

export const UNIQUE_PREFIX = 'u' as const
export const EMPTY = '' as const

type Optional<T> = T | undefined

/**
 * Check if an object is empty
 * @param obj - the object to check
**/
export function isEmpty(obj: Record<string, unknown>): boolean {
  // eslint-disable-next-line guard-for-in, @typescript-eslint/naming-convention, no-unreachable-loop
  for (const _ in obj) {
    return false
  }
  return true
}

/**
 * Export the value from the archive object { __kind, value }
 * @param call - the call to extract the value from
**/
export function onlyValue(call: ArchiveCallWithOptionalValue): string {
  return call?.value
}

/**
 * Check if a value is a hex string
 * @param value - the value to check
**/
export function isHex(value: unknown): value is string {
  return typeof value === 'string' && value.length % 2 === 0 && /^0x[\da-f]*$/i.test(value)
}

/**
 * Decode an ss58 address from the value
 * @param address - the address to decode
**/
export function addressOf(address: Uint8Array | string): string {
  const value = isHex(address) ? decodeHex(address) : address
  if (!value) {
    return ''
  }
  return ss58.codec(codec).encode(value)
}

/**
 * Decode a hex value
 * @param value - the value to decode
**/
export function unHex<T>(value: T): T | string {
  return isHex(value) ? decodeHex(value).toString() : value
}

/**
 * @deprecated Use the unjs/ufo package
 **/
export function camelCase(str: string): string {
  return str.replace(/(_[a-z])/gi, ($1) => $1.toUpperCase().replace('_', ''))
}

/**
 * @deprecated unused.
 **/
export function metadataOf({ metadata }: SomethingWithOptionalMeta): string {
  return metadata ?? ''
}

/**
 * @deprecated use ?? operator.
 **/
export function oneOf<T>(one: T, two: T): T {
  return one || two
}

export function isUniquePallet(context: Context): boolean {
  return context.event.name.startsWith('Uniques')
}

export function isNonFungiblePallet(context: Context): boolean {
  return context.event.name.startsWith('Nfts')
}

export function str<T extends object | number>(value: Optional<T>): string {
  return value?.toString() || ''
}

export function idOf<T extends object | number>(value: Optional<T>, prefix: string = ''): string {
  const val = str(value)
  return prefix && val ? `${prefix}-${val}` : val
}

export function versionOf(context: Context): 1 | 2 {
  if (isUniquePallet(context)) {
    return 1
  }

  if (isNonFungiblePallet(context)) {
    return 2
  }

  throw new Error(`Unknown pallet: ${context.event.name}`)
}

/**
 * @deprecated Use the new {@link idOf} with prefix.
 */
export function prefixOf(context: Context): string {
  if (isUniquePallet(context)) {
    return UNIQUE_PREFIX
  }

  return EMPTY
}

export async function calculateCollectionOwnerCountAndDistribution(
  store: Store,
  collectionId: string,
  newOwner?: string,
  originalOwner?: string
): Promise<{ ownerCount: number; distribution: number }> {
  const query: string = `
  SELECT COUNT(DISTINCT current_owner) AS distribution,
       COUNT(current_owner) AS owner_count
  ${
    newOwner
      ? `
  ,(SELECT max(CASE
                  WHEN current_owner = '${newOwner}' THEN 0
                  ELSE 1
              END)
   FROM nft_entity) AS adjustment
  `
      : ''
  } 
  FROM nft_entity
  WHERE collection_id = '${collectionId}'
  ${originalOwner ? `AND current_owner != '${originalOwner}'` : ''}
  `
  const [result]: { owner_count: number; distribution: number; adjustment?: number }[] = await emOf(store).query(query)

  const adjustedResults = {
    ownerCount: result.owner_count - (result.adjustment ?? 0),
    distribution: result.distribution - (result.adjustment ?? 0),
  }

  return adjustedResults
}

export async function calculateCollectionFloor(
  store: Store,
  collectionId: string,
  nftId: string
): Promise<{ floor: bigint }> {
  const query: string = `
  SELECT MIN(NULLIF(nft_entity.price, 0)) as floor
  FROM nft_entity
  WHERE collection_id = '${collectionId}'
  AND nft_entity.id <> '${nftId}'
  `
  const [result]: { floor: bigint; }[] = await emOf(store).query(query)

  return {
    floor: result.floor ?? BigInt(0)
  }
}
