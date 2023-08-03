import { MetadataAttribute } from '@kodadot1/metasquid/types'
import { Attribute } from '../../model'
import { WithAmount, WithOwner, createTokenId } from '../utils/types'
import { str } from '../utils/helper'
import { PriceDirection } from '../../types/statemine/v9420'

export type WithId = {
  id: string
}

export type BaseCollectionEvent = {
  id: string
  caller: string
}

export type BaseTokenEvent = {
  collectionId: string
  sn: string
}

export type OptionalMeta = {
  metadata?: string
}

export type CreateCollectionEvent = BaseCollectionEvent &
  OptionalMeta & {
    owner: string
  }

export type ForceCreateCollectionEvent = Omit<CreateCollectionEvent, 'caller'>

export type CreateTokenEvent = BaseTokenEvent &
  OptionalMeta & {
    // caller: string; // Not Correct // may you can mint & send in one
    owner: string
    metadata?: string
  }

export type TransferTokenEvent = BaseTokenEvent & {
  caller: string
  to: string
}

export type ListTokenEvent = BaseTokenEvent & {
  price?: bigint
}

export type BuyTokenEvent = ListTokenEvent & {
  currentOwner: string
  caller: string
}

export type BurnTokenEvent = CreateTokenEvent

export type DestroyCollectionEvent = WithId

export type LockCollectionEvent = WithId & {
  max: number
}

export type ChangeCollectionOwnerEvent = WithId & {
  owner: string
}

export type SetMetadata = Omit<BaseTokenEvent, 'sn'> &
  OptionalMeta & {
    sn?: string
  }

export type SetAttribute = Omit<BaseTokenEvent, 'sn'> & {
  sn?: string
  trait: string
  value?: string
}

export type ChangeCollectionTeam = WithId & {
  issuer: string
  admin: string
  freezer: string
}

export type CreateSwapEvent = BaseTokenEvent & WithAmount & {
  expiresAt: bigint;
  surcharge?: 'Offer' | 'Consideration';
  consideration: Consideration;
}

export type CancelSwapEvent = CreateSwapEvent

export type ClaimSwapEvent = CreateSwapEvent & WithOwner & {
  consideration: Consideration & WithOwner;
}

export type Consideration = BaseTokenEvent & {
  sn?: string;
}


export const considerationOf = (collection: number, tokenId: number | undefined): Consideration => ({
  collectionId: str(collection),
  sn: tokenId ? str(tokenId) : '',
})

export const priceDirectionOf = (direction?: PriceDirection): 'Offer' | 'Consideration' | undefined => {
  switch (direction?.__kind) {
    case 'Send':
      return 'Offer'
    case 'Receive':
      return 'Consideration'
    default:
      return undefined
  }
}

export const tokenIdOf = (base: BaseTokenEvent): string => createTokenId(base.collectionId, base.sn)

export function attributeFrom(attribute: MetadataAttribute): Attribute {
  return new Attribute(
    {},
    {
      display: String(attribute.display_type),
      trait: String(attribute.trait_type),
      value: String(attribute.value),
    }
  )
}
