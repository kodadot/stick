import {sts, Result, Option, Bytes, BitSequence} from './support'

export interface CollectionDetails {
    owner: AccountId32
    issuer: AccountId32
    admin: AccountId32
    freezer: AccountId32
    totalDeposit: bigint
    freeHolding: boolean
    items: number
    itemMetadatas: number
    attributes: number
    isFrozen: boolean
}

export type AccountId32 = Bytes

export const CollectionDetails: sts.Type<CollectionDetails> = sts.struct(() => {
    return  {
        owner: AccountId32,
        issuer: AccountId32,
        admin: AccountId32,
        freezer: AccountId32,
        totalDeposit: sts.bigint(),
        freeHolding: sts.boolean(),
        items: sts.number(),
        itemMetadatas: sts.number(),
        attributes: sts.number(),
        isFrozen: sts.boolean(),
    }
})

export const BoundedVec = sts.bytes()

export const AccountId32 = sts.bytes()
