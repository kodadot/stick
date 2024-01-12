import {sts, Result, Option, Bytes, BitSequence} from './support'

export interface Type_363 {
    deposit: ItemMetadataDeposit
    data: Bytes
}

export interface ItemMetadataDeposit {
    account?: (AccountId32 | undefined)
    amount: bigint
}

export type AccountId32 = Bytes

export const Type_363: sts.Type<Type_363> = sts.struct(() => {
    return  {
        deposit: ItemMetadataDeposit,
        data: sts.bytes(),
    }
})

export const ItemMetadataDeposit: sts.Type<ItemMetadataDeposit> = sts.struct(() => {
    return  {
        account: sts.option(() => AccountId32),
        amount: sts.bigint(),
    }
})

export interface Type_353 {
    owner: AccountId32
    ownerDeposit: bigint
    items: number
    itemMetadatas: number
    itemConfigs: number
    attributes: number
}

export const Type_353: sts.Type<Type_353> = sts.struct(() => {
    return  {
        owner: AccountId32,
        ownerDeposit: sts.bigint(),
        items: sts.number(),
        itemMetadatas: sts.number(),
        itemConfigs: sts.number(),
        attributes: sts.number(),
    }
})

export const PalletAttributes: sts.Type<PalletAttributes> = sts.closedEnum(() => {
    return  {
        TransferDisabled: sts.unit(),
        UsedToClaim: sts.number(),
    }
})

export type PalletAttributes = PalletAttributes_TransferDisabled | PalletAttributes_UsedToClaim

export interface PalletAttributes_TransferDisabled {
    __kind: 'TransferDisabled'
}

export interface PalletAttributes_UsedToClaim {
    __kind: 'UsedToClaim'
    value: number
}

export const PriceWithDirection: sts.Type<PriceWithDirection> = sts.struct(() => {
    return  {
        amount: sts.bigint(),
        direction: PriceDirection,
    }
})

export const PriceDirection: sts.Type<PriceDirection> = sts.closedEnum(() => {
    return  {
        Receive: sts.unit(),
        Send: sts.unit(),
    }
})

export type PriceDirection = PriceDirection_Receive | PriceDirection_Send

export interface PriceDirection_Receive {
    __kind: 'Receive'
}

export interface PriceDirection_Send {
    __kind: 'Send'
}

export interface PriceWithDirection {
    amount: bigint
    direction: PriceDirection
}

export const AttributeNamespace: sts.Type<AttributeNamespace> = sts.closedEnum(() => {
    return  {
        Account: AccountId32,
        CollectionOwner: sts.unit(),
        ItemOwner: sts.unit(),
        Pallet: sts.unit(),
    }
})

export type AttributeNamespace = AttributeNamespace_Account | AttributeNamespace_CollectionOwner | AttributeNamespace_ItemOwner | AttributeNamespace_Pallet

export interface AttributeNamespace_Account {
    __kind: 'Account'
    value: AccountId32
}

export interface AttributeNamespace_CollectionOwner {
    __kind: 'CollectionOwner'
}

export interface AttributeNamespace_ItemOwner {
    __kind: 'ItemOwner'
}

export interface AttributeNamespace_Pallet {
    __kind: 'Pallet'
}

export const AccountId32 = sts.bytes()
