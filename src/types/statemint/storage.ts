import assert from 'assert'
import {Block, BlockContext, Chain, ChainContext, Option, Result, StorageBase} from './support'
import * as v601 from './v601'
import * as v9230 from './v9230'

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
    get isV601(): boolean {
        return this.getTypeHash() === '1e1179cfd57216efc5c1637c0aa0a4ae6eff2649845c501f9d404542ba254ed4'
    }

    /**
     *  Details of an asset class.
     */
    get asV601(): UniquesClassStorageV601 {
        assert(this.isV601)
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
export interface UniquesClassStorageV601 {
    get(key: number): Promise<(v601.ClassDetails | undefined)>
    getAll(): Promise<v601.ClassDetails[]>
    getMany(keys: number[]): Promise<(v601.ClassDetails | undefined)[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: v601.ClassDetails][]>
    getPairs(key: number): Promise<[k: number, v: v601.ClassDetails][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: v601.ClassDetails][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: v601.ClassDetails][]>
}

/**
 *  Details of a collection.
 */
export interface UniquesClassStorageV9230 {
    get(key: number): Promise<(v9230.CollectionDetails | undefined)>
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
    get isV601(): boolean {
        return this.getTypeHash() === '36776a13816cab10cc18dd56fcac5cb2817f77f7b82bf520cc24f74ac55e6f6d'
    }

    /**
     *  Metadata of an asset instance.
     */
    get asV601(): UniquesInstanceMetadataOfStorageV601 {
        assert(this.isV601)
        return this as any
    }
}

/**
 *  Metadata of an asset instance.
 */
export interface UniquesInstanceMetadataOfStorageV601 {
    get(key1: number, key2: number): Promise<(v601.InstanceMetadata | undefined)>
    getAll(): Promise<v601.InstanceMetadata[]>
    getMany(keys: [number, number][]): Promise<(v601.InstanceMetadata | undefined)[]>
    getKeys(): Promise<[number, number][]>
    getKeys(key1: number): Promise<[number, number][]>
    getKeys(key1: number, key2: number): Promise<[number, number][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, key1: number, key2: number): AsyncIterable<[number, number][]>
    getPairs(): Promise<[k: [number, number], v: v601.InstanceMetadata][]>
    getPairs(key1: number): Promise<[k: [number, number], v: v601.InstanceMetadata][]>
    getPairs(key1: number, key2: number): Promise<[k: [number, number], v: v601.InstanceMetadata][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, number], v: v601.InstanceMetadata][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, number], v: v601.InstanceMetadata][]>
    getPairsPaged(pageSize: number, key1: number, key2: number): AsyncIterable<[k: [number, number], v: v601.InstanceMetadata][]>
}
