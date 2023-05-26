import type { Result, Option } from './support'

export interface CollectionDetails {
  owner: Uint8Array
  issuer: Uint8Array
  admin: Uint8Array
  freezer: Uint8Array
  totalDeposit: bigint
  freeHolding: boolean
  items: number
  itemMetadatas: number
  attributes: number
  isFrozen: boolean
}
