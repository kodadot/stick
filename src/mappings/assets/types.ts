export type WithId = {
  id: string
}

export type BaseAssetEvent = {
  id: string
  caller: string
}

export type CreateAssetEvent = BaseAssetEvent & {
  owner: string
}

export type ForceCreateAssetEvent = Omit<CreateAssetEvent, 'caller'>

export type SetMetadata = WithId & {
  name: string;
  symbol: string;
  decimals: number;
  isFrozen: boolean;
}