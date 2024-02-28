import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v1 from '../v1'
import * as v700 from '../v700'
import * as v900 from '../v900'
import * as v9230 from '../v9230'
import * as v9270 from '../v9270'

export const created =  {
    name: 'Uniques.Created',
    /**
     *  An asset class was created. \[ class, creator, owner \]
     */
    v1: new EventType(
        'Uniques.Created',
        sts.tuple([v1.ClassId, v1.AccountId, v1.AccountId])
    ),
    /**
     * An asset class was created.
     */
    v700: new EventType(
        'Uniques.Created',
        sts.struct({
            class: sts.number(),
            creator: v700.AccountId32,
            owner: v700.AccountId32,
        })
    ),
    /**
     * A `collection` was created.
     */
    v9230: new EventType(
        'Uniques.Created',
        sts.struct({
            collection: sts.number(),
            creator: v9230.AccountId32,
            owner: v9230.AccountId32,
        })
    ),
}

export const forceCreated =  {
    name: 'Uniques.ForceCreated',
    /**
     *  An asset class was force-created. \[ class, owner \]
     */
    v1: new EventType(
        'Uniques.ForceCreated',
        sts.tuple([v1.ClassId, v1.AccountId])
    ),
    /**
     * An asset class was force-created.
     */
    v700: new EventType(
        'Uniques.ForceCreated',
        sts.struct({
            class: sts.number(),
            owner: v700.AccountId32,
        })
    ),
    /**
     * A `collection` was force-created.
     */
    v9230: new EventType(
        'Uniques.ForceCreated',
        sts.struct({
            collection: sts.number(),
            owner: v9230.AccountId32,
        })
    ),
}

export const destroyed =  {
    name: 'Uniques.Destroyed',
    /**
     *  An asset `class` was destroyed. \[ class \]
     */
    v1: new EventType(
        'Uniques.Destroyed',
        v1.ClassId
    ),
    /**
     * An asset `class` was destroyed.
     */
    v700: new EventType(
        'Uniques.Destroyed',
        sts.struct({
            class: sts.number(),
        })
    ),
    /**
     * A `collection` was destroyed.
     */
    v9230: new EventType(
        'Uniques.Destroyed',
        sts.struct({
            collection: sts.number(),
        })
    ),
}

export const issued =  {
    name: 'Uniques.Issued',
    /**
     *  An asset `instace` was issued. \[ class, instance, owner \]
     */
    v1: new EventType(
        'Uniques.Issued',
        sts.tuple([v1.ClassId, v1.InstanceId, v1.AccountId])
    ),
    /**
     * An asset `instance` was issued.
     */
    v700: new EventType(
        'Uniques.Issued',
        sts.struct({
            class: sts.number(),
            instance: sts.number(),
            owner: v700.AccountId32,
        })
    ),
    /**
     * An `item` was issued.
     */
    v9230: new EventType(
        'Uniques.Issued',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
            owner: v9230.AccountId32,
        })
    ),
}

export const transferred =  {
    name: 'Uniques.Transferred',
    /**
     *  An asset `instace` was transferred. \[ class, instance, from, to \]
     */
    v1: new EventType(
        'Uniques.Transferred',
        sts.tuple([v1.ClassId, v1.InstanceId, v1.AccountId, v1.AccountId])
    ),
    /**
     * An asset `instance` was transferred.
     */
    v700: new EventType(
        'Uniques.Transferred',
        sts.struct({
            class: sts.number(),
            instance: sts.number(),
            from: v700.AccountId32,
            to: v700.AccountId32,
        })
    ),
    /**
     * An `item` was transferred.
     */
    v9230: new EventType(
        'Uniques.Transferred',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
            from: v9230.AccountId32,
            to: v9230.AccountId32,
        })
    ),
}

export const burned =  {
    name: 'Uniques.Burned',
    /**
     *  An asset `instance` was destroyed. \[ class, instance, owner \]
     */
    v1: new EventType(
        'Uniques.Burned',
        sts.tuple([v1.ClassId, v1.InstanceId, v1.AccountId])
    ),
    /**
     * An asset `instance` was destroyed.
     */
    v700: new EventType(
        'Uniques.Burned',
        sts.struct({
            class: sts.number(),
            instance: sts.number(),
            owner: v700.AccountId32,
        })
    ),
    /**
     * An `item` was destroyed.
     */
    v9230: new EventType(
        'Uniques.Burned',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
            owner: v9230.AccountId32,
        })
    ),
}

export const frozen =  {
    name: 'Uniques.Frozen',
    /**
     *  Some asset `instance` was frozen. \[ class, instance \]
     */
    v1: new EventType(
        'Uniques.Frozen',
        sts.tuple([v1.ClassId, v1.InstanceId])
    ),
    /**
     * Some asset `instance` was frozen.
     */
    v700: new EventType(
        'Uniques.Frozen',
        sts.struct({
            class: sts.number(),
            instance: sts.number(),
        })
    ),
    /**
     * Some `item` was frozen.
     */
    v9230: new EventType(
        'Uniques.Frozen',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
        })
    ),
}

export const thawed =  {
    name: 'Uniques.Thawed',
    /**
     *  Some asset `instance` was thawed. \[ class, instance \]
     */
    v1: new EventType(
        'Uniques.Thawed',
        sts.tuple([v1.ClassId, v1.InstanceId])
    ),
    /**
     * Some asset `instance` was thawed.
     */
    v700: new EventType(
        'Uniques.Thawed',
        sts.struct({
            class: sts.number(),
            instance: sts.number(),
        })
    ),
    /**
     * Some `item` was thawed.
     */
    v9230: new EventType(
        'Uniques.Thawed',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
        })
    ),
}

export const classFrozen =  {
    name: 'Uniques.ClassFrozen',
    /**
     *  Some asset `class` was frozen. \[ class \]
     */
    v1: new EventType(
        'Uniques.ClassFrozen',
        v1.ClassId
    ),
    /**
     * Some asset `class` was frozen.
     */
    v700: new EventType(
        'Uniques.ClassFrozen',
        sts.struct({
            class: sts.number(),
        })
    ),
}

export const classThawed =  {
    name: 'Uniques.ClassThawed',
    /**
     *  Some asset `class` was thawed. \[ class \]
     */
    v1: new EventType(
        'Uniques.ClassThawed',
        v1.ClassId
    ),
    /**
     * Some asset `class` was thawed.
     */
    v700: new EventType(
        'Uniques.ClassThawed',
        sts.struct({
            class: sts.number(),
        })
    ),
}

export const ownerChanged =  {
    name: 'Uniques.OwnerChanged',
    /**
     *  The owner changed \[ class, new_owner \]
     */
    v1: new EventType(
        'Uniques.OwnerChanged',
        sts.tuple([v1.ClassId, v1.AccountId])
    ),
    /**
     * The owner changed.
     */
    v700: new EventType(
        'Uniques.OwnerChanged',
        sts.struct({
            class: sts.number(),
            newOwner: v700.AccountId32,
        })
    ),
    /**
     * The owner changed.
     */
    v9230: new EventType(
        'Uniques.OwnerChanged',
        sts.struct({
            collection: sts.number(),
            newOwner: v9230.AccountId32,
        })
    ),
}

export const teamChanged =  {
    name: 'Uniques.TeamChanged',
    /**
     *  The management team changed \[ class, issuer, admin, freezer \]
     */
    v1: new EventType(
        'Uniques.TeamChanged',
        sts.tuple([v1.ClassId, v1.AccountId, v1.AccountId, v1.AccountId])
    ),
    /**
     * The management team changed.
     */
    v700: new EventType(
        'Uniques.TeamChanged',
        sts.struct({
            class: sts.number(),
            issuer: v700.AccountId32,
            admin: v700.AccountId32,
            freezer: v700.AccountId32,
        })
    ),
    /**
     * The management team changed.
     */
    v9230: new EventType(
        'Uniques.TeamChanged',
        sts.struct({
            collection: sts.number(),
            issuer: v9230.AccountId32,
            admin: v9230.AccountId32,
            freezer: v9230.AccountId32,
        })
    ),
}

export const classMetadataSet =  {
    name: 'Uniques.ClassMetadataSet',
    /**
     *  New metadata has been set for an asset class. \[ class, data, is_frozen \]
     */
    v1: new EventType(
        'Uniques.ClassMetadataSet',
        sts.tuple([v1.ClassId, sts.bytes(), sts.boolean()])
    ),
    /**
     * New metadata has been set for an asset class.
     */
    v700: new EventType(
        'Uniques.ClassMetadataSet',
        sts.struct({
            class: sts.number(),
            data: v700.BoundedVec,
            isFrozen: sts.boolean(),
        })
    ),
}

export const classMetadataCleared =  {
    name: 'Uniques.ClassMetadataCleared',
    /**
     *  Metadata has been cleared for an asset class. \[ class \]
     */
    v1: new EventType(
        'Uniques.ClassMetadataCleared',
        v1.ClassId
    ),
    /**
     * Metadata has been cleared for an asset class.
     */
    v700: new EventType(
        'Uniques.ClassMetadataCleared',
        sts.struct({
            class: sts.number(),
        })
    ),
}

export const metadataSet =  {
    name: 'Uniques.MetadataSet',
    /**
     *  New metadata has been set for an asset instance.
     *  \[ class, instance, data, is_frozen \]
     */
    v1: new EventType(
        'Uniques.MetadataSet',
        sts.tuple([v1.ClassId, v1.InstanceId, sts.bytes(), sts.boolean()])
    ),
    /**
     * New metadata has been set for an asset instance.
     */
    v700: new EventType(
        'Uniques.MetadataSet',
        sts.struct({
            class: sts.number(),
            instance: sts.number(),
            data: v700.BoundedVec,
            isFrozen: sts.boolean(),
        })
    ),
    /**
     * New metadata has been set for an item.
     */
    v9230: new EventType(
        'Uniques.MetadataSet',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
            data: v9230.BoundedVec,
            isFrozen: sts.boolean(),
        })
    ),
}

export const metadataCleared =  {
    name: 'Uniques.MetadataCleared',
    /**
     *  Metadata has been cleared for an asset instance. \[ class, instance \]
     */
    v1: new EventType(
        'Uniques.MetadataCleared',
        sts.tuple([v1.ClassId, v1.InstanceId])
    ),
    /**
     * Metadata has been cleared for an asset instance.
     */
    v700: new EventType(
        'Uniques.MetadataCleared',
        sts.struct({
            class: sts.number(),
            instance: sts.number(),
        })
    ),
    /**
     * Metadata has been cleared for an item.
     */
    v9230: new EventType(
        'Uniques.MetadataCleared',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
        })
    ),
}

export const attributeSet =  {
    name: 'Uniques.AttributeSet',
    /**
     *  New attribute metadata has been set for an asset class or instance.
     *  \[ class, maybe_instance, key, value \]
     */
    v1: new EventType(
        'Uniques.AttributeSet',
        sts.tuple([v1.ClassId, sts.option(() => v1.InstanceId), sts.bytes(), sts.bytes()])
    ),
    /**
     * New attribute metadata has been set for an asset class or instance.
     */
    v700: new EventType(
        'Uniques.AttributeSet',
        sts.struct({
            class: sts.number(),
            maybeInstance: sts.option(() => sts.number()),
            key: sts.bytes(),
            value: sts.bytes(),
        })
    ),
    /**
     * New attribute metadata has been set for a `collection` or `item`.
     */
    v9230: new EventType(
        'Uniques.AttributeSet',
        sts.struct({
            collection: sts.number(),
            maybeItem: sts.option(() => sts.number()),
            key: sts.bytes(),
            value: sts.bytes(),
        })
    ),
}

export const attributeCleared =  {
    name: 'Uniques.AttributeCleared',
    /**
     *  Attribute metadata has been cleared for an asset class or instance.
     *  \[ class, maybe_instance, key, maybe_value \]
     */
    v1: new EventType(
        'Uniques.AttributeCleared',
        sts.tuple([v1.ClassId, sts.option(() => v1.InstanceId), sts.bytes()])
    ),
    /**
     * Attribute metadata has been cleared for an asset class or instance.
     */
    v700: new EventType(
        'Uniques.AttributeCleared',
        sts.struct({
            class: sts.number(),
            maybeInstance: sts.option(() => sts.number()),
            key: sts.bytes(),
        })
    ),
    /**
     * Attribute metadata has been cleared for a `collection` or `item`.
     */
    v9230: new EventType(
        'Uniques.AttributeCleared',
        sts.struct({
            collection: sts.number(),
            maybeItem: sts.option(() => sts.number()),
            key: sts.bytes(),
        })
    ),
}

export const ownershipAcceptanceChanged =  {
    name: 'Uniques.OwnershipAcceptanceChanged',
    /**
     * Ownership acceptance has changed for an account.
     */
    v900: new EventType(
        'Uniques.OwnershipAcceptanceChanged',
        sts.struct({
            who: v900.AccountId32,
            maybeClass: sts.option(() => sts.number()),
        })
    ),
    /**
     * Ownership acceptance has changed for an account.
     */
    v9230: new EventType(
        'Uniques.OwnershipAcceptanceChanged',
        sts.struct({
            who: v9230.AccountId32,
            maybeCollection: sts.option(() => sts.number()),
        })
    ),
}

export const collectionFrozen =  {
    name: 'Uniques.CollectionFrozen',
    /**
     * Some `collection` was frozen.
     */
    v9230: new EventType(
        'Uniques.CollectionFrozen',
        sts.struct({
            collection: sts.number(),
        })
    ),
}

export const collectionThawed =  {
    name: 'Uniques.CollectionThawed',
    /**
     * Some `collection` was thawed.
     */
    v9230: new EventType(
        'Uniques.CollectionThawed',
        sts.struct({
            collection: sts.number(),
        })
    ),
}

export const collectionMetadataSet =  {
    name: 'Uniques.CollectionMetadataSet',
    /**
     * New metadata has been set for a `collection`.
     */
    v9230: new EventType(
        'Uniques.CollectionMetadataSet',
        sts.struct({
            collection: sts.number(),
            data: v9230.BoundedVec,
            isFrozen: sts.boolean(),
        })
    ),
}

export const collectionMetadataCleared =  {
    name: 'Uniques.CollectionMetadataCleared',
    /**
     * Metadata has been cleared for a `collection`.
     */
    v9230: new EventType(
        'Uniques.CollectionMetadataCleared',
        sts.struct({
            collection: sts.number(),
        })
    ),
}

export const collectionMaxSupplySet =  {
    name: 'Uniques.CollectionMaxSupplySet',
    /**
     * Max supply has been set for a collection.
     */
    v9230: new EventType(
        'Uniques.CollectionMaxSupplySet',
        sts.struct({
            collection: sts.number(),
            maxSupply: sts.number(),
        })
    ),
}

export const itemPriceSet =  {
    name: 'Uniques.ItemPriceSet',
    /**
     * The price was set for the instance.
     */
    v9270: new EventType(
        'Uniques.ItemPriceSet',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
            price: sts.bigint(),
            whitelistedBuyer: sts.option(() => v9270.AccountId32),
        })
    ),
}

export const itemPriceRemoved =  {
    name: 'Uniques.ItemPriceRemoved',
    /**
     * The price for the instance was removed.
     */
    v9270: new EventType(
        'Uniques.ItemPriceRemoved',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
        })
    ),
}

export const itemBought =  {
    name: 'Uniques.ItemBought',
    /**
     * An item was bought.
     */
    v9270: new EventType(
        'Uniques.ItemBought',
        sts.struct({
            collection: sts.number(),
            item: sts.number(),
            price: sts.bigint(),
            seller: v9270.AccountId32,
            buyer: v9270.AccountId32,
        })
    ),
}
