import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v9430 from '../v9430'

export const updateMintSettings =  {
    name: 'Nfts.update_mint_settings',
    /**
     * Update mint settings.
     * 
     * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Issuer
     * of the `collection`.
     * 
     * - `collection`: The identifier of the collection to change.
     * - `mint_settings`: The new mint settings.
     * 
     * Emits `CollectionMintSettingsUpdated` event when successful.
     */
    v9430: new CallType(
        'Nfts.update_mint_settings',
        sts.struct({
            collection: sts.number(),
            mintSettings: v9430.MintSettings,
        })
    ),
}
