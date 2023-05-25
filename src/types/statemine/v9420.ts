import type {Result, Option} from './support'

export type AttributeNamespace = AttributeNamespace_Pallet | AttributeNamespace_CollectionOwner | AttributeNamespace_ItemOwner | AttributeNamespace_Account

export interface AttributeNamespace_Pallet {
    __kind: 'Pallet'
}

export interface AttributeNamespace_CollectionOwner {
    __kind: 'CollectionOwner'
}

export interface AttributeNamespace_ItemOwner {
    __kind: 'ItemOwner'
}

export interface AttributeNamespace_Account {
    __kind: 'Account'
    value: Uint8Array
}

export type PalletAttributes = PalletAttributes_UsedToClaim

export interface PalletAttributes_UsedToClaim {
    __kind: 'UsedToClaim'
    value: number
}

export interface PriceWithDirection {
    amount: bigint
    direction: PriceDirection
}

export interface Type_348 {
    owner: Uint8Array
    ownerDeposit: bigint
    items: number
    itemMetadatas: number
    itemConfigs: number
    attributes: number
}

export interface Type_358 {
    deposit: ItemMetadataDeposit
    data: Uint8Array
}

export type PriceDirection = PriceDirection_Send | PriceDirection_Receive

export interface PriceDirection_Send {
    __kind: 'Send'
}

export interface PriceDirection_Receive {
    __kind: 'Receive'
}

export interface ItemMetadataDeposit {
    account: (Uint8Array | undefined)
    amount: bigint
}
