import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v601 from '../v601'
import * as v9230 from '../v9230'

export const class_ =  {
    /**
     *  Details of an asset class.
     */
    v601: new StorageType('Uniques.Class', 'Optional', [sts.number()], v601.ClassDetails) as ClassV601,
    /**
     *  Details of a collection.
     */
    v9230: new StorageType('Uniques.Class', 'Optional', [sts.number()], v9230.CollectionDetails) as ClassV9230,
}

/**
 *  Details of an asset class.
 */
export interface ClassV601  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v601.ClassDetails | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v601.ClassDetails | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v601.ClassDetails | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v601.ClassDetails | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v601.ClassDetails | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v601.ClassDetails | undefined)][]>
}

/**
 *  Details of a collection.
 */
export interface ClassV9230  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v9230.CollectionDetails | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v9230.CollectionDetails | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v9230.CollectionDetails | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v9230.CollectionDetails | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v9230.CollectionDetails | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v9230.CollectionDetails | undefined)][]>
}

export const instanceMetadataOf =  {
    /**
     *  Metadata of an asset instance.
     */
    v601: new StorageType('Uniques.InstanceMetadataOf', 'Optional', [sts.number(), sts.number()], v601.InstanceMetadata) as InstanceMetadataOfV601,
}

/**
 *  Metadata of an asset instance.
 */
export interface InstanceMetadataOfV601  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: number, key2: number): Promise<(v601.InstanceMetadata | undefined)>
    getMany(block: Block, keys: [number, number][]): Promise<(v601.InstanceMetadata | undefined)[]>
    getKeys(block: Block): Promise<[number, number][]>
    getKeys(block: Block, key1: number): Promise<[number, number][]>
    getKeys(block: Block, key1: number, key2: number): Promise<[number, number][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: number): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: number, key2: number): AsyncIterable<[number, number][]>
    getPairs(block: Block): Promise<[k: [number, number], v: (v601.InstanceMetadata | undefined)][]>
    getPairs(block: Block, key1: number): Promise<[k: [number, number], v: (v601.InstanceMetadata | undefined)][]>
    getPairs(block: Block, key1: number, key2: number): Promise<[k: [number, number], v: (v601.InstanceMetadata | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [number, number], v: (v601.InstanceMetadata | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: number): AsyncIterable<[k: [number, number], v: (v601.InstanceMetadata | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: number, key2: number): AsyncIterable<[k: [number, number], v: (v601.InstanceMetadata | undefined)][]>
}
