export enum Unique {
  clearAttribute = 'Uniques.AttributeCleared',
  setAttribute = 'Uniques.AttributeSet',
  burn = 'Uniques.Burned',
  forceCreateClass = 'Uniques.ForceCreated',
  freezeClass = 'Uniques.ClassFrozen',
  clearClassMetadata = 'Uniques.ClassMetadataCleared',
  setClassMetadata = 'Uniques.ClassMetadataSet',
  thawClass = 'Uniques.ClassThawed',
  freezeCollection = 'Uniques.CollectionFrozen',
  setCollectionMaxSupply = 'Uniques.CollectionMaxSupplySet',
  clearCollectionMetadata = 'Uniques.CollectionMetadataCleared',
  setCollectionMetadata = 'Uniques.CollectionMetadataSet',
  thawCollection = 'Uniques.CollectionThawed',
  createCollection = 'Uniques.Created',
  destroyCollection = 'Uniques.Destroyed',
  freeze = 'Uniques.Frozen',
  createItem = 'Uniques.Issued',
  sold = 'Uniques.ItemBought',
  clearPrice = 'Uniques.ItemPriceRemoved',
  setPrice = 'Uniques.ItemPriceSet',
  clearMetadata = 'Uniques.MetadataCleared',
  setMetadata = 'Uniques.MetadataSet',
  changeIssuer = 'Uniques.OwnerChanged',
  changeOwnershipAcceptance = 'Uniques.OwnershipAcceptanceChanged',
  changeTeam = 'Uniques.TeamChanged',
  thaw = 'Uniques.Thawed',
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

export enum NonFungible {
  burn = 'Nfts.Burned',
  changeIssuer = 'Nfts.OwnerChanged',
  changeOwnershipAcceptance = 'Nfts.OwnershipAcceptanceChanged',
  changeTeam = 'Nfts.TeamChanged',
  clearAttribute = 'Nfts.AttributeCleared',
  clearCollectionMetadata = 'Nfts.CollectionMetadataCleared',
  clearMetadata = 'Nfts.ItemMetadataCleared',
  clearPrice = 'Nfts.ItemPriceRemoved',
  createCollection = 'Nfts.Created', // should use extrisnic instead of event
  createItem = 'Nfts.Issued',
  destroyCollection = 'Nfts.Destroyed',
  forceCreateCollection = 'Nfts.ForceCreated',
  freeze = 'Nfts.Frozen',
  freezeCollection = 'Nfts.CollectionFrozen',
  setAttribute = 'Nfts.AttributeSet',
  setCollectionMaxSupply = 'Nfts.CollectionMaxSupplySet',
  setCollectionMetadata = 'Nfts.CollectionMetadataSet',
  setMetadata = 'Nfts.ItemMetadataSet',
  setPrice = 'Nfts.ItemPriceSet',
  sold = 'Nfts.ItemBought',
  thaw = 'Nfts.Thawed',
  thawCollection = 'Nfts.CollectionThawed',
  transfer = 'Nfts.Transferred',
}

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

export enum NonFungibleCall {
  updateMintSettings = 'Nfts.update_mint_settings',
}

export enum Asset {
  create = 'Assets.Created',
  destroy = 'Assets.Destroyed',
  forceCreate = 'Assets.ForceCreated',
  clearMetadata = 'Assets.ClassMetadataCleared',
  setMetadata = 'Assets.MetadataSet',
}