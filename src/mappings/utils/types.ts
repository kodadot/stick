import { EventHandlerContext } from '@subsquid/substrate-processor';
import { nanoid } from 'nanoid';
import { EntityManager } from 'typeorm';
// impsort { Interaction } from '../../model/generated/_interaction';
// import { Attribute } from '../../model/generated/_attribute';

enum Interaction {
  MINT,
  DESTROY
}

export type BaseCall = {
  caller: string;
  blockNumber: string;
  timestamp: Date;
};

export { Interaction };

export type CollectionInteraction = Interaction.MINT | Interaction.DESTROY;

type OneOfInteraction = Interaction;

export function collectionEventFrom(interaction: CollectionInteraction, basecall: BaseCall, meta: string): IEvent<CollectionInteraction> {
  return eventFrom<CollectionInteraction>(interaction, basecall, meta);
}

export function eventFrom<T>(interaction: T, { blockNumber, caller, timestamp }: BaseCall, meta: string, currentOwner?: string): IEvent<T> {
  return {
    interaction,
    blockNumber: BigInt(blockNumber),
    caller,
    currentOwner: currentOwner ?? caller,
    timestamp,
    meta,
  };
}

// export function attributeFrom(attribute: MetadataAttribute): Attribute {
//   return new Attribute({}, {
//     display: String(attribute.display_type),
//     trait: String(attribute.trait_type),
//     value: String(attribute.value),
//   });
// }

export type Store = EntityManager;
export type Context = EventHandlerContext<Store>;

export type Optional<T> = T | null;

export interface IEvent<T = OneOfInteraction> {
  interaction: T;
  blockNumber: bigint,
  caller: string,
  currentOwner: string,
  timestamp: Date,
  meta: string;
}


export type CallWith<T> = BaseCall & T;

export type EntityConstructor<T> = {
  new (...args: any[]): T;
};

export type WithAmount = {
  amount: bigint;
};

export type WithCaller = {
  caller: string;
};

export type SomethingWithMeta = {
  metadata: string
};

export type SomethingWithOptionalMeta = {
  metadata?: string
};

export type UnwrapFunc<T> = (ctx: Context) => T;
export type SanitizerFunc = (url: string) => string;

export function ensure<T>(value: unknown): T {
  return value as T;
}

export const createTokenId = (collection: string, id: string): string => `${collection}-${id}`;

export const eventId = (id: string, event: Interaction): string => `${id}-${event}-${nanoid()}`;

export type TokenMetadata = {
  name?: string
  description: string
  external_url?: string
  image: string
  animation_url?: string
  attributes?: MetadataAttribute[]
};

export type MetadataAttribute = {
  display_type?: DisplayType
  trait_type?: string
  value: number | string
};

export enum DisplayType {
  null,
  'boost_number',
  'number',
  'boost_percentage',
}
