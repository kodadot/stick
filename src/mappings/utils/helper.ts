import * as ss58 from '@subsquid/ss58'
import { decodeHex } from '@subsquid/substrate-processor'
import { Context, SomethingWithOptionalMeta } from './types'
import { ArchiveCallWithOptionalValue } from '@kodadot1/metasquid/types'
import { isProd } from '../../environment'

const codec = isProd ? 'kusama' : 'polkadot'

type Optional<T> = T | undefined;

export function isEmpty(obj: Record<string, unknown>): boolean {
  // eslint-disable-next-line guard-for-in, @typescript-eslint/naming-convention
  for (const _ in obj) { return false; }
  return true;
}

export function onlyValue(call: ArchiveCallWithOptionalValue): string {
  return call?.value
}


export function addressOf(address: Uint8Array | string): string {
  const value = typeof address === 'string' ? decodeHex(address) : address;
  if (!value) {
    return '';
  }
  return ss58.codec(codec).encode(value);
}

export function camelCase(str: string): string {
  return str.replace(/([_][a-z])/gi, ($1) => $1.toUpperCase().replace('_', ''));
}

export function metadataOf({ metadata }: SomethingWithOptionalMeta): string {
  return metadata ?? '';
}

export function oneOf<T>(one: T, two: T): T {
  return one || two;
}

export function isNewUnique(context: Context): boolean {
  return context.event.name.startsWith('Nfts');
}

export function str<T extends Object>(value: Optional<T>): string {
  return value?.toString() || '';
}

export function idOf<T extends Object>(value: Optional<T>, prefix: string = ''): string {
  const val = str(value);
  return prefix && val ? `${prefix}-${val}` : val;
}