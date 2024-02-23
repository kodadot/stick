import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v9430 from '../v9430'

export const created =  {
    name: 'Nfts.Created',
    /**
     * A `collection` was created.
     */
    v9430: new EventType(
        'Nfts.Created',
        sts.struct({
            collection: sts.number(),
            creator: v9430.AccountId32,
            owner: v9430.AccountId32,
        })
    ),
}

export const forceCreated =  {
    name: 'Nfts.ForceCreated',
    /**
     * A `collection` was force-created.
     */
    v9430: new EventType(
        'Nfts.ForceCreated',
        sts.struct({
            collection: sts.number(),
            owner: v9430.AccountId32,
        })
    ),
}

export const destroyed =  {
    name: 'Nfts.Destroyed',
    /**
     * A `collection` was destroyed.
     */
    v9430: new EventType(
        'Nfts.Destroyed',
        sts.struct({
            collection: sts.number(),
        })
    ),
}

export const issued =  {
    name: 'Nfts.Issued',
    /**
     * An `item` was issued.
     */
    v9430: new EventType(
        'Nfts.Issued',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
            owner: v9430.AccountId32,
        })
    ),
}

export const transferred =  {
    name: 'Nfts.Transferred',
    /**
     * An `item` was transferred.
     */
    v9430: new EventType(
        'Nfts.Transferred',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
            from: v9430.AccountId32,
            to: v9430.AccountId32,
        })
    ),
}

export const burned =  {
    name: 'Nfts.Burned',
    /**
     * An `item` was destroyed.
     */
    v9430: new EventType(
        'Nfts.Burned',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
            owner: v9430.AccountId32,
        })
    ),
}

export const itemTransferLocked =  {
    name: 'Nfts.ItemTransferLocked',
    /**
     * An `item` became non-transferable.
     */
    v9430: new EventType(
        'Nfts.ItemTransferLocked',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
        })
    ),
}

export const itemTransferUnlocked =  {
    name: 'Nfts.ItemTransferUnlocked',
    /**
     * An `item` became transferable.
     */
    v9430: new EventType(
        'Nfts.ItemTransferUnlocked',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
        })
    ),
}

export const itemPropertiesLocked =  {
    name: 'Nfts.ItemPropertiesLocked',
    /**
     * `item` metadata or attributes were locked.
     */
    v9430: new EventType(
        'Nfts.ItemPropertiesLocked',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
            lockMetadata: sts.boolean(),
            lockAttributes: sts.boolean(),
        })
    ),
}

export const collectionLocked =  {
    name: 'Nfts.CollectionLocked',
    /**
     * Some `collection` was locked.
     */
    v9430: new EventType(
        'Nfts.CollectionLocked',
        sts.struct({
            collection: sts.number(),
        })
    ),
}

export const ownerChanged =  {
    name: 'Nfts.OwnerChanged',
    /**
     * The owner changed.
     */
    v9430: new EventType(
        'Nfts.OwnerChanged',
        sts.struct({
            collection: sts.number(),
            newOwner: v9430.AccountId32,
        })
    ),
}

export const teamChanged =  {
    name: 'Nfts.TeamChanged',
    /**
     * The management team changed.
     */
    v9430: new EventType(
        'Nfts.TeamChanged',
        sts.struct({
            collection: sts.number(),
            issuer: sts.option(() => v9430.AccountId32),
            admin: sts.option(() => v9430.AccountId32),
            freezer: sts.option(() => v9430.AccountId32),
        })
    ),
}

export const transferApproved =  {
    name: 'Nfts.TransferApproved',
    /**
     * An `item` of a `collection` has been approved by the `owner` for transfer by
     * a `delegate`.
     */
    v9430: new EventType(
        'Nfts.TransferApproved',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
            owner: v9430.AccountId32,
            delegate: v9430.AccountId32,
            deadline: sts.option(() => sts.number()),
        })
    ),
}

export const approvalCancelled =  {
    name: 'Nfts.ApprovalCancelled',
    /**
     * An approval for a `delegate` account to transfer the `item` of an item
     * `collection` was cancelled by its `owner`.
     */
    v9430: new EventType(
        'Nfts.ApprovalCancelled',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
            owner: v9430.AccountId32,
            delegate: v9430.AccountId32,
        })
    ),
}

export const allApprovalsCancelled =  {
    name: 'Nfts.AllApprovalsCancelled',
    /**
     * All approvals of an item got cancelled.
     */
    v9430: new EventType(
        'Nfts.AllApprovalsCancelled',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
            owner: v9430.AccountId32,
        })
    ),
}

export const collectionConfigChanged =  {
    name: 'Nfts.CollectionConfigChanged',
    /**
     * A `collection` has had its config changed by the `Force` origin.
     */
    v9430: new EventType(
        'Nfts.CollectionConfigChanged',
        sts.struct({
            collection: sts.number(),
        })
    ),
}

export const collectionMetadataSet =  {
    name: 'Nfts.CollectionMetadataSet',
    /**
     * New metadata has been set for a `collection`.
     */
    v9430: new EventType(
        'Nfts.CollectionMetadataSet',
        sts.struct({
            collection: sts.number(),
            data: sts.bytes(),
        })
    ),
}

export const collectionMetadataCleared =  {
    name: 'Nfts.CollectionMetadataCleared',
    /**
     * Metadata has been cleared for a `collection`.
     */
    v9430: new EventType(
        'Nfts.CollectionMetadataCleared',
        sts.struct({
            collection: sts.number(),
        })
    ),
}

export const itemMetadataSet =  {
    name: 'Nfts.ItemMetadataSet',
    /**
     * New metadata has been set for an item.
     */
    v9430: new EventType(
        'Nfts.ItemMetadataSet',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
            data: sts.bytes(),
        })
    ),
}

export const itemMetadataCleared =  {
    name: 'Nfts.ItemMetadataCleared',
    /**
     * Metadata has been cleared for an item.
     */
    v9430: new EventType(
        'Nfts.ItemMetadataCleared',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
        })
    ),
}

export const attributeSet =  {
    name: 'Nfts.AttributeSet',
    /**
     * New attribute metadata has been set for a `collection` or `item`.
     */
    v9430: new EventType(
        'Nfts.AttributeSet',
        sts.struct({
            collection: sts.number(),
            maybeItem: sts.option(() => sts.number()),
            key: sts.bytes(),
            value: sts.bytes(),
            namespace: v9430.AttributeNamespace,
        })
    ),
}

export const attributeCleared =  {
    name: 'Nfts.AttributeCleared',
    /**
     * Attribute metadata has been cleared for a `collection` or `item`.
     */
    v9430: new EventType(
        'Nfts.AttributeCleared',
        sts.struct({
            collection: sts.number(),
            maybeItem: sts.option(() => sts.number()),
            key: sts.bytes(),
            namespace: v9430.AttributeNamespace,
        })
    ),
}

export const itemAttributesApprovalAdded =  {
    name: 'Nfts.ItemAttributesApprovalAdded',
    /**
     * A new approval to modify item attributes was added.
     */
    v9430: new EventType(
        'Nfts.ItemAttributesApprovalAdded',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
            delegate: v9430.AccountId32,
        })
    ),
}

export const itemAttributesApprovalRemoved =  {
    name: 'Nfts.ItemAttributesApprovalRemoved',
    /**
     * A new approval to modify item attributes was removed.
     */
    v9430: new EventType(
        'Nfts.ItemAttributesApprovalRemoved',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
            delegate: v9430.AccountId32,
        })
    ),
}

export const ownershipAcceptanceChanged =  {
    name: 'Nfts.OwnershipAcceptanceChanged',
    /**
     * Ownership acceptance has changed for an account.
     */
    v9430: new EventType(
        'Nfts.OwnershipAcceptanceChanged',
        sts.struct({
            who: v9430.AccountId32,
            maybeCollection: sts.option(() => sts.number()),
        })
    ),
}

export const collectionMaxSupplySet =  {
    name: 'Nfts.CollectionMaxSupplySet',
    /**
     * Max supply has been set for a collection.
     */
    v9430: new EventType(
        'Nfts.CollectionMaxSupplySet',
        sts.struct({
            collection: sts.number(),
            maxSupply: sts.number(),
        })
    ),
}

export const collectionMintSettingsUpdated =  {
    name: 'Nfts.CollectionMintSettingsUpdated',
    /**
     * Mint settings for a collection had changed.
     */
    v9430: new EventType(
        'Nfts.CollectionMintSettingsUpdated',
        sts.struct({
            collection: sts.number(),
        })
    ),
}

export const nextCollectionIdIncremented =  {
    name: 'Nfts.NextCollectionIdIncremented',
    /**
     * Event gets emitted when the `NextCollectionId` gets incremented.
     */
    v9430: new EventType(
        'Nfts.NextCollectionIdIncremented',
        sts.struct({
            nextId: sts.number(),
        })
    ),
    /**
     * Event gets emitted when the `NextCollectionId` gets incremented.
     */
    v1000000: new EventType(
        'Nfts.NextCollectionIdIncremented',
        sts.struct({
            nextId: sts.option(() => sts.number()),
        })
    ),
}

export const itemPriceSet =  {
    name: 'Nfts.ItemPriceSet',
    /**
     * The price was set for the item.
     */
    v9430: new EventType(
        'Nfts.ItemPriceSet',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
            price: sts.bigint(),
            whitelistedBuyer: sts.option(() => v9430.AccountId32),
        })
    ),
}

export const itemPriceRemoved =  {
    name: 'Nfts.ItemPriceRemoved',
    /**
     * The price for the item was removed.
     */
    v9430: new EventType(
        'Nfts.ItemPriceRemoved',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
        })
    ),
}

export const itemBought =  {
    name: 'Nfts.ItemBought',
    /**
     * An item was bought.
     */
    v9430: new EventType(
        'Nfts.ItemBought',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
            price: sts.bigint(),
            seller: v9430.AccountId32,
            buyer: v9430.AccountId32,
        })
    ),
}

export const tipSent =  {
    name: 'Nfts.TipSent',
    /**
     * A tip was sent.
     */
    v9430: new EventType(
        'Nfts.TipSent',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
            sender: v9430.AccountId32,
            receiver: v9430.AccountId32,
            amount: sts.bigint(),
        })
    ),
}

export const swapCreated =  {
    name: 'Nfts.SwapCreated',
    /**
     * An `item` swap intent was created.
     */
    v9430: new EventType(
        'Nfts.SwapCreated',
        sts.struct({
            offeredCollection: sts.number(),
            offeredItem: sts.number(),
            desiredCollection: sts.number(),
            desiredItem: sts.option(() => sts.number()),
            price: sts.option(() => v9430.PriceWithDirection),
            deadline: sts.number(),
        })
    ),
}

export const swapCancelled =  {
    name: 'Nfts.SwapCancelled',
    /**
     * The swap was cancelled.
     */
    v9430: new EventType(
        'Nfts.SwapCancelled',
        sts.struct({
            offeredCollection: sts.number(),
            offeredItem: sts.number(),
            desiredCollection: sts.number(),
            desiredItem: sts.option(() => sts.number()),
            price: sts.option(() => v9430.PriceWithDirection),
            deadline: sts.number(),
        })
    ),
}

export const swapClaimed =  {
    name: 'Nfts.SwapClaimed',
    /**
     * The swap has been claimed.
     */
    v9430: new EventType(
        'Nfts.SwapClaimed',
        sts.struct({
            sentCollection: sts.number(),
            sentItem: sts.number(),
            sentItemOwner: v9430.AccountId32,
            receivedCollection: sts.number(),
            receivedItem: sts.number(),
            receivedItemOwner: v9430.AccountId32,
            price: sts.option(() => v9430.PriceWithDirection),
            deadline: sts.number(),
        })
    ),
}

export const preSignedAttributesSet =  {
    name: 'Nfts.PreSignedAttributesSet',
    /**
     * New attributes have been set for an `item` of the `collection`.
     */
    v9430: new EventType(
        'Nfts.PreSignedAttributesSet',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
            namespace: v9430.AttributeNamespace,
        })
    ),
}

export const palletAttributeSet =  {
    name: 'Nfts.PalletAttributeSet',
    /**
     * A new attribute in the `Pallet` namespace was set for the `collection` or an `item`
     * within that `collection`.
     */
    v9430: new EventType(
        'Nfts.PalletAttributeSet',
        sts.struct({
            collection: sts.number(),
            item: sts.option(() => sts.number()),
            attribute: v9430.PalletAttributes,
            value: sts.bytes(),
        })
    ),
}
