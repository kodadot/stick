import { createTokenId } from '../utils/types';

export type WithId = {
  id: string;
}

export type BaseCollectionEvent = {
  id: string;
  caller: string;
};

export type BaseTokenEvent = {
  collectionId: string;
  sn: string;
};

export type OptionalMeta = {
  metadata?: string;
};

export type CreateCollectionEvent = BaseCollectionEvent & OptionalMeta & {
  owner: string;
};

export type ForceCreateCollectionEvent = Omit<CreateCollectionEvent, 'caller'>

export type CreateTokenEvent = BaseTokenEvent & OptionalMeta & {
  // caller: string; // Not Correct // may you can mint & send in one
  owner: string;
  metadata?: string;
};

export type TransferTokenEvent = BaseTokenEvent & {
  caller: string;
  to: string;
};

export type ListTokenEvent = BaseTokenEvent & {
  price?: bigint
};

export type BuyTokenEvent = ListTokenEvent & {
  currentOwner: string;
  caller: string;
};

export type BurnTokenEvent = CreateTokenEvent;

export type DestroyCollectionEvent = WithId

export type LockCollectionEvent = WithId & {
  max: number;
}

export type SetMetadata = Omit<BaseTokenEvent, 'sn'> & OptionalMeta & {
  sn?: string;
}

export const tokenIdOf = (base: BaseTokenEvent): string => createTokenId(base.collectionId, base.sn);