import type {Result, Option} from './support'

export interface ClassDetails {
    owner: Uint8Array
    issuer: Uint8Array
    admin: Uint8Array
    freezer: Uint8Array
    totalDeposit: bigint
    freeHolding: boolean
    instances: number
    instanceMetadatas: number
    attributes: number
    isFrozen: boolean
}

export interface InstanceMetadata {
    deposit: bigint
    data: Uint8Array
    isFrozen: boolean
}
