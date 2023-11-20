import {sts, Result, Option, Bytes, BitSequence} from './support'

export type InstanceId = number

export interface InstanceMetadata {
    deposit: DepositBalance
    data: Bytes
    isFrozen: boolean
}

export type DepositBalance = bigint

export const InstanceMetadata: sts.Type<InstanceMetadata> = sts.struct(() => {
    return  {
        deposit: DepositBalance,
        data: sts.bytes(),
        isFrozen: sts.boolean(),
    }
})

export const DepositBalance = sts.bigint()

export type ClassId = number

export interface ClassDetails {
    owner: AccountId
    issuer: AccountId
    admin: AccountId
    freezer: AccountId
    totalDeposit: DepositBalance
    freeHolding: boolean
    instances: number
    instanceMetadatas: number
    attributes: number
    isFrozen: boolean
}

export type AccountId = Bytes

export const ClassDetails: sts.Type<ClassDetails> = sts.struct(() => {
    return  {
        owner: AccountId,
        issuer: AccountId,
        admin: AccountId,
        freezer: AccountId,
        totalDeposit: DepositBalance,
        freeHolding: sts.boolean(),
        instances: sts.number(),
        instanceMetadatas: sts.number(),
        attributes: sts.number(),
        isFrozen: sts.boolean(),
    }
})

export const InstanceId = sts.number()

export const AccountId = sts.bytes()

export const ClassId = sts.number()
