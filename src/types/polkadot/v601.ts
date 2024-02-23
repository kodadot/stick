import {sts, Result, Option, Bytes, BitSequence} from './support'

export interface InstanceMetadata {
    deposit: bigint
    data: BoundedVec
    isFrozen: boolean
}

export type BoundedVec = Bytes

export const InstanceMetadata: sts.Type<InstanceMetadata> = sts.struct(() => {
    return  {
        deposit: sts.bigint(),
        data: BoundedVec,
        isFrozen: sts.boolean(),
    }
})

export interface ClassDetails {
    owner: AccountId32
    issuer: AccountId32
    admin: AccountId32
    freezer: AccountId32
    totalDeposit: bigint
    freeHolding: boolean
    instances: number
    instanceMetadatas: number
    attributes: number
    isFrozen: boolean
}

export type AccountId32 = Bytes

export const ClassDetails: sts.Type<ClassDetails> = sts.struct(() => {
    return  {
        owner: AccountId32,
        issuer: AccountId32,
        admin: AccountId32,
        freezer: AccountId32,
        totalDeposit: sts.bigint(),
        freeHolding: sts.boolean(),
        instances: sts.number(),
        instanceMetadatas: sts.number(),
        attributes: sts.number(),
        isFrozen: sts.boolean(),
    }
})

export const BoundedVec = sts.bytes()

export const AccountId32 = sts.bytes()
