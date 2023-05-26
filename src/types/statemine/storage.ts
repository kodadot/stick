import assert from 'node:assert'
import { Block, BlockContext, Chain, ChainContext, Option, Result, StorageBase } from './support'
import * as v1 from './v1'
import * as v9230 from './v9230'
import * as v9420 from './v9420'

export class NftsCollectionStorage extends StorageBase {
  protected getPrefix() {
    return 'Nfts'
  }

  protected getName() {
    return 'Collection'
  }

  /**
   *  Details of a collection.
   */
  get isV9420(): boolean {
    return this.getTypeHash() === '2048922b0682bb5b7de7ca9a7e01264f12386f5c3cad9a3e84b1e5a81cd69913'
  }

  /**
   *  Details of a collection.
   */
  get asV9420(): NftsCollectionStorageV9420 {
    assert(this.isV9420)
    return this as any
  }
}

/**
 *  Details of a collection.
 */
export interface NftsCollectionStorageV9420 {
  get(key: number): Promise<v9420.Type_348 | undefined>
  getAll(): Promise<v9420.Type_348[]>
  getMany(keys: number[]): Promise<(v9420.Type_348 | undefined)[]>
  getKeys(): Promise<number[]>
  getKeys(key: number): Promise<number[]>
  getKeysPaged(pageSize: number): AsyncIterable<number[]>
  getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
  getPairs(): Promise<[k: number, v: v9420.Type_348][]>
  getPairs(key: number): Promise<[k: number, v: v9420.Type_348][]>
  getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: v9420.Type_348][]>
  getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: v9420.Type_348][]>
}

export class NftsItemMetadataOfStorage extends StorageBase {
  protected getPrefix() {
    return 'Nfts'
  }

  protected getName() {
    return 'ItemMetadataOf'
  }

  /**
   *  Metadata of an item.
   */
  get isV9420(): boolean {
    return this.getTypeHash() === 'a2ef643060836070ede73871794a2c9da331285c79b5e9e6f9935723f37af9c6'
  }

  /**
   *  Metadata of an item.
   */
  get asV9420(): NftsItemMetadataOfStorageV9420 {
    assert(this.isV9420)
    return this as any
  }
}

/**
 *  Metadata of an item.
 */
export interface NftsItemMetadataOfStorageV9420 {
  get(key1: number, key2: number): Promise<v9420.Type_358 | undefined>
  getAll(): Promise<v9420.Type_358[]>
  getMany(keys: [number, number][]): Promise<(v9420.Type_358 | undefined)[]>
  getKeys(): Promise<[number, number][]>
  getKeys(key1: number): Promise<[number, number][]>
  getKeys(key1: number, key2: number): Promise<[number, number][]>
  getKeysPaged(pageSize: number): AsyncIterable<[number, number][]>
  getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, number][]>
  getKeysPaged(pageSize: number, key1: number, key2: number): AsyncIterable<[number, number][]>
  getPairs(): Promise<[k: [number, number], v: v9420.Type_358][]>
  getPairs(key1: number): Promise<[k: [number, number], v: v9420.Type_358][]>
  getPairs(key1: number, key2: number): Promise<[k: [number, number], v: v9420.Type_358][]>
  getPairsPaged(pageSize: number): AsyncIterable<[k: [number, number], v: v9420.Type_358][]>
  getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, number], v: v9420.Type_358][]>
  getPairsPaged(pageSize: number, key1: number, key2: number): AsyncIterable<[k: [number, number], v: v9420.Type_358][]>
}

export class UniquesClassStorage extends StorageBase {
  protected getPrefix() {
    return 'Uniques'
  }

  protected getName() {
    return 'Class'
  }

  /**
   *  Details of an asset class.
   */
  get isV1(): boolean {
    return this.getTypeHash() === '1e1179cfd57216efc5c1637c0aa0a4ae6eff2649845c501f9d404542ba254ed4'
  }

  /**
   *  Details of an asset class.
   */
  get asV1(): UniquesClassStorageV1 {
    assert(this.isV1)
    return this as any
  }

  /**
   *  Details of a collection.
   */
  get isV9230(): boolean {
    return this.getTypeHash() === '7d8bf59996f2d3901df3ccd9b19fb3c13d435bb2d2b67820e7ee13c594f1cb1b'
  }

  /**
   *  Details of a collection.
   */
  get asV9230(): UniquesClassStorageV9230 {
    assert(this.isV9230)
    return this as any
  }
}

/**
 *  Details of an asset class.
 */
export interface UniquesClassStorageV1 {
  get(key: number): Promise<v1.ClassDetails | undefined>
  getAll(): Promise<v1.ClassDetails[]>
  getMany(keys: number[]): Promise<(v1.ClassDetails | undefined)[]>
  getKeys(): Promise<number[]>
  getKeys(key: number): Promise<number[]>
  getKeysPaged(pageSize: number): AsyncIterable<number[]>
  getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
  getPairs(): Promise<[k: number, v: v1.ClassDetails][]>
  getPairs(key: number): Promise<[k: number, v: v1.ClassDetails][]>
  getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: v1.ClassDetails][]>
  getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: v1.ClassDetails][]>
}

/**
 *  Details of a collection.
 */
export interface UniquesClassStorageV9230 {
  get(key: number): Promise<v9230.CollectionDetails | undefined>
  getAll(): Promise<v9230.CollectionDetails[]>
  getMany(keys: number[]): Promise<(v9230.CollectionDetails | undefined)[]>
  getKeys(): Promise<number[]>
  getKeys(key: number): Promise<number[]>
  getKeysPaged(pageSize: number): AsyncIterable<number[]>
  getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
  getPairs(): Promise<[k: number, v: v9230.CollectionDetails][]>
  getPairs(key: number): Promise<[k: number, v: v9230.CollectionDetails][]>
  getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: v9230.CollectionDetails][]>
  getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: v9230.CollectionDetails][]>
}

export class UniquesInstanceMetadataOfStorage extends StorageBase {
  protected getPrefix() {
    return 'Uniques'
  }

  protected getName() {
    return 'InstanceMetadataOf'
  }

  /**
   *  Metadata of an asset instance.
   */
  get isV1(): boolean {
    return this.getTypeHash() === '36776a13816cab10cc18dd56fcac5cb2817f77f7b82bf520cc24f74ac55e6f6d'
  }

  /**
   *  Metadata of an asset instance.
   */
  get asV1(): UniquesInstanceMetadataOfStorageV1 {
    assert(this.isV1)
    return this as any
  }
}

/**
 *  Metadata of an asset instance.
 */
export interface UniquesInstanceMetadataOfStorageV1 {
  get(key1: number, key2: number): Promise<v1.InstanceMetadata | undefined>
  getAll(): Promise<v1.InstanceMetadata[]>
  getMany(keys: [number, number][]): Promise<(v1.InstanceMetadata | undefined)[]>
  getKeys(): Promise<[number, number][]>
  getKeys(key1: number): Promise<[number, number][]>
  getKeys(key1: number, key2: number): Promise<[number, number][]>
  getKeysPaged(pageSize: number): AsyncIterable<[number, number][]>
  getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, number][]>
  getKeysPaged(pageSize: number, key1: number, key2: number): AsyncIterable<[number, number][]>
  getPairs(): Promise<[k: [number, number], v: v1.InstanceMetadata][]>
  getPairs(key1: number): Promise<[k: [number, number], v: v1.InstanceMetadata][]>
  getPairs(key1: number, key2: number): Promise<[k: [number, number], v: v1.InstanceMetadata][]>
  getPairsPaged(pageSize: number): AsyncIterable<[k: [number, number], v: v1.InstanceMetadata][]>
  getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, number], v: v1.InstanceMetadata][]>
  getPairsPaged(
    pageSize: number,
    key1: number,
    key2: number
  ): AsyncIterable<[k: [number, number], v: v1.InstanceMetadata][]>
}
