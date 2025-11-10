// LIST OF THE EVENTS / CALLS that we are processing
// USAGE: [NameOfThePallet].[EventName] or [NameOfThePallet].[call_name]
// Naming pattern is enforced by SubSquid

/**
 * Unique Pallet Events
 * @enum {string}
 * @readonly
 */
export enum Unique {
  clearAttribute = 'Uniques.AttributeCleared',
  setAttribute = 'Uniques.AttributeSet',
  burn = 'Uniques.Burned',
  forceCreateClass = 'Uniques.ForceCreated',
  freezeClass = 'Uniques.ClassFrozen', // unused
  clearClassMetadata = 'Uniques.ClassMetadataCleared',
  setClassMetadata = 'Uniques.ClassMetadataSet',
  thawClass = 'Uniques.ClassThawed', // unused
  freezeCollection = 'Uniques.CollectionFrozen', // unused
  setCollectionMaxSupply = 'Uniques.CollectionMaxSupplySet',
  clearCollectionMetadata = 'Uniques.CollectionMetadataCleared',
  setCollectionMetadata = 'Uniques.CollectionMetadataSet',
  thawCollection = 'Uniques.CollectionThawed', // unused
  createCollection = 'Uniques.Created',
  destroyCollection = 'Uniques.Destroyed',
  freeze = 'Uniques.Frozen', // unused
  createItem = 'Uniques.Issued',
  sold = 'Uniques.ItemBought',
  clearPrice = 'Uniques.ItemPriceRemoved',
  setPrice = 'Uniques.ItemPriceSet',
  clearMetadata = 'Uniques.MetadataCleared',
  setMetadata = 'Uniques.MetadataSet',
  changeIssuer = 'Uniques.OwnerChanged',
  changeOwnershipAcceptance = 'Uniques.OwnershipAcceptanceChanged', // unused
  changeTeam = 'Uniques.TeamChanged',
  thaw = 'Uniques.Thawed', // unused
  transfer = 'Uniques.Transferred',
  // placeOffer = 'Marketplace.OfferPlaced',
  // withdrawOffer = 'Marketplace.OfferWithdrawn',
  // acceptOffer = 'Marketplace.OfferAccepted',
  // payRoyalty = 'Marketplace.RoyaltyPaid',
  // addRoyalty = 'Marketplace.RoyaltyAdded',
  // registerAsset = 'AssetRegistry.Registered',
  // updateAsset = 'AssetRegistry.Updated',
  // setAssetMetadata = 'AssetRegistry.MetadataSet',
}


/**
 * NFTs Pallet Events
 * @enum {string}
 * @readonly
 */
export enum NonFungible {
  burn = 'Nfts.Burned',
  changeIssuer = 'Nfts.OwnerChanged',
  changeOwnershipAcceptance = 'Nfts.OwnershipAcceptanceChanged', // unused
  changeTeam = 'Nfts.TeamChanged',
  clearAttribute = 'Nfts.AttributeCleared',
  clearCollectionMetadata = 'Nfts.CollectionMetadataCleared',
  clearMetadata = 'Nfts.ItemMetadataCleared',
  clearPrice = 'Nfts.ItemPriceRemoved',
  createCollection = 'Nfts.Created', // should use extrisnic instead of event
  createItem = 'Nfts.Issued',
  destroyCollection = 'Nfts.Destroyed',
  forceCreateCollection = 'Nfts.ForceCreated',
  freeze = 'Nfts.Frozen', // unused
  freezeCollection = 'Nfts.CollectionFrozen', // unused
  setAttribute = 'Nfts.AttributeSet',
  setCollectionMaxSupply = 'Nfts.CollectionMaxSupplySet',
  setCollectionMetadata = 'Nfts.CollectionMetadataSet',
  setMetadata = 'Nfts.ItemMetadataSet',
  setPrice = 'Nfts.ItemPriceSet',
  sold = 'Nfts.ItemBought',
  thaw = 'Nfts.Thawed', // unused
  thawCollection = 'Nfts.CollectionThawed', // unused
  transfer = 'Nfts.Transferred',
}

/**
 * NFTs Pallet new Events
 * @enum {string}
 * @readonly
 */
export enum NewNonFungible {
  // changeCollectionConfig = 'Nfts.CollectionConfigChanged', // should use extrisnic instead of event
  // lockCollection = 'Nfts.CollectionLocked',
  // updateCollectionMintSettings = 'Nfts.CollectionMintSettingsUpdated', // should use extrisnic instead of event
  // lockItemProperties = 'Nfts.ItemPropertiesLocked',
  // lockItemTransfer = 'Nfts.ItemTransferLocked',
  // unlockItemTransfer = 'Nfts.ItemTransferUnlocked',
  // setPalletAttribute = 'Nfts.PalletAttributeSet', // can skip this
  // setPreSignedAttributes = 'Nfts.PreSignedAttributesSet',
  cancelSwap = 'Nfts.SwapCancelled',
  claimSwap = 'Nfts.SwapClaimed',
  createSwap = 'Nfts.SwapCreated',
  sendTip = 'Nfts.TipSent', // can be used for marking royaltyPaid
}

/**
 * NFTs Pallet Calls
 * @enum {string}
 * @readonly
 */
export enum NonFungibleCall {
  updateMintSettings = 'Nfts.update_mint_settings',
  transfer = 'Nfts.transfer',
  buyItem = 'Nfts.buy_item',
  claimSwap = 'Nfts.claim_swap',
}

/**
 * Parachain System Calls
 * Used to extract relay chain context (e.g., relay parent block number)
 */
export enum ParachainSystemCall {
  setValidationData = 'ParachainSystem.set_validation_data',
}

/**
 * Assets Pallet Events
 * @enum {string}
 * @readonly
 */
export enum Asset {
  create = 'Assets.Created', // unused
  destroy = 'Assets.Destroyed', // unused
  forceCreate = 'Assets.ForceCreated', // unused
  clearMetadata = 'Assets.ClassMetadataCleared', // unused
  setMetadata = 'Assets.MetadataSet',
}