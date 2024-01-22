import { ArchiveCall, ArchiveCallWithOptionalValue, MetadataAttribute, Optional } from '@kodadot1/metasquid/types'
import { Attribute } from '../../model'
import { createTokenId } from '../utils/types'

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

type MaybeArchiveCall = Pick<ArchiveCall, '__kind'> & { value?: any }

export type UpdateMintSettings = WithId & {
  type: MaybeArchiveCall
  startBlock: Optional<number>,
  endBlock: Optional<number>,
  price: Optional<bigint>,
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
