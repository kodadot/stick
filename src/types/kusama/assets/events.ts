import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v1 from '../v1'
import * as v700 from '../v700'

export const created =  {
    name: 'Assets.Created',
    /**
     *  Some asset class was created. \[asset_id, creator, owner\]
     */
    v1: new EventType(
        'Assets.Created',
        sts.tuple([v1.AssetId, v1.AccountId, v1.AccountId])
    ),
    /**
     * Some asset class was created.
     */
    v700: new EventType(
        'Assets.Created',
        sts.struct({
            assetId: sts.number(),
            creator: v700.AccountId32,
            owner: v700.AccountId32,
        })
    ),
}

export const burned =  {
    name: 'Assets.Burned',
    /**
     *  Some assets were destroyed. \[asset_id, owner, balance\]
     */
    v1: new EventType(
        'Assets.Burned',
        sts.tuple([v1.AssetId, v1.AccountId, v1.TAssetBalance])
    ),
    /**
     * Some assets were destroyed.
     */
    v700: new EventType(
        'Assets.Burned',
        sts.struct({
            assetId: sts.number(),
            owner: v700.AccountId32,
            balance: sts.bigint(),
        })
    ),
}

export const destroyed =  {
    name: 'Assets.Destroyed',
    /**
     *  An asset class was destroyed.
     */
    v1: new EventType(
        'Assets.Destroyed',
        v1.AssetId
    ),
    /**
     * An asset class was destroyed.
     */
    v700: new EventType(
        'Assets.Destroyed',
        sts.struct({
            assetId: sts.number(),
        })
    ),
}

export const forceCreated =  {
    name: 'Assets.ForceCreated',
    /**
     *  Some asset class was force-created. \[asset_id, owner\]
     */
    v1: new EventType(
        'Assets.ForceCreated',
        sts.tuple([v1.AssetId, v1.AccountId])
    ),
    /**
     * Some asset class was force-created.
     */
    v700: new EventType(
        'Assets.ForceCreated',
        sts.struct({
            assetId: sts.number(),
            owner: v700.AccountId32,
        })
    ),
}

export const metadataSet =  {
    name: 'Assets.MetadataSet',
    /**
     *  New metadata has been set for an asset. \[asset_id, name, symbol, decimals, is_frozen\]
     */
    v1: new EventType(
        'Assets.MetadataSet',
        sts.tuple([v1.AssetId, sts.bytes(), sts.bytes(), sts.number(), sts.boolean()])
    ),
    /**
     * New metadata has been set for an asset.
     */
    v700: new EventType(
        'Assets.MetadataSet',
        sts.struct({
            assetId: sts.number(),
            name: sts.bytes(),
            symbol: sts.bytes(),
            decimals: sts.number(),
            isFrozen: sts.boolean(),
        })
    ),
}

export const metadataCleared =  {
    name: 'Assets.MetadataCleared',
    /**
     *  Metadata has been cleared for an asset. \[asset_id\]
     */
    v1: new EventType(
        'Assets.MetadataCleared',
        v1.AssetId
    ),
    /**
     * Metadata has been cleared for an asset.
     */
    v700: new EventType(
        'Assets.MetadataCleared',
        sts.struct({
            assetId: sts.number(),
        })
    ),
}
