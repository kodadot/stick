import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v1 from '../v1'
import * as v9230 from '../v9230'

export const class_ =  {
    /**
     *  Details of an asset class.
     */
    v1: new StorageType('Uniques.Class', 'Optional', [v1.ClassId], v1.ClassDetails) as ClassV1,
    /**
     *  Details of a collection.
     */
    v9230: new StorageType('Uniques.Class', 'Optional', [sts.number()], v9230.CollectionDetails) as ClassV9230,
}

/**
 *  Details of an asset class.
 */
export interface ClassV1  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v1.ClassId): Promise<(v1.ClassDetails | undefined)>
    getMany(block: Block, keys: v1.ClassId[]): Promise<(v1.ClassDetails | undefined)[]>
    getKeys(block: Block): Promise<v1.ClassId[]>
    getKeys(block: Block, key: v1.ClassId): Promise<v1.ClassId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v1.ClassId[]>
    getKeysPaged(pageSize: number, block: Block, key: v1.ClassId): AsyncIterable<v1.ClassId[]>
    getPairs(block: Block): Promise<[k: v1.ClassId, v: (v1.ClassDetails | undefined)][]>
    getPairs(block: Block, key: v1.ClassId): Promise<[k: v1.ClassId, v: (v1.ClassDetails | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v1.ClassId, v: (v1.ClassDetails | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v1.ClassId): AsyncIterable<[k: v1.ClassId, v: (v1.ClassDetails | undefined)][]>
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
    v1: new StorageType('Uniques.InstanceMetadataOf', 'Optional', [v1.ClassId, v1.InstanceId], v1.InstanceMetadata) as InstanceMetadataOfV1,
}

/**
 *  Metadata of an asset instance.
 */
export interface InstanceMetadataOfV1  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: v1.ClassId, key2: v1.InstanceId): Promise<(v1.InstanceMetadata | undefined)>
    getMany(block: Block, keys: [v1.ClassId, v1.InstanceId][]): Promise<(v1.InstanceMetadata | undefined)[]>
    getKeys(block: Block): Promise<[v1.ClassId, v1.InstanceId][]>
    getKeys(block: Block, key1: v1.ClassId): Promise<[v1.ClassId, v1.InstanceId][]>
    getKeys(block: Block, key1: v1.ClassId, key2: v1.InstanceId): Promise<[v1.ClassId, v1.InstanceId][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v1.ClassId, v1.InstanceId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v1.ClassId): AsyncIterable<[v1.ClassId, v1.InstanceId][]>
    getKeysPaged(pageSize: number, block: Block, key1: v1.ClassId, key2: v1.InstanceId): AsyncIterable<[v1.ClassId, v1.InstanceId][]>
    getPairs(block: Block): Promise<[k: [v1.ClassId, v1.InstanceId], v: (v1.InstanceMetadata | undefined)][]>
    getPairs(block: Block, key1: v1.ClassId): Promise<[k: [v1.ClassId, v1.InstanceId], v: (v1.InstanceMetadata | undefined)][]>
    getPairs(block: Block, key1: v1.ClassId, key2: v1.InstanceId): Promise<[k: [v1.ClassId, v1.InstanceId], v: (v1.InstanceMetadata | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v1.ClassId, v1.InstanceId], v: (v1.InstanceMetadata | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v1.ClassId): AsyncIterable<[k: [v1.ClassId, v1.InstanceId], v: (v1.InstanceMetadata | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v1.ClassId, key2: v1.InstanceId): AsyncIterable<[k: [v1.ClassId, v1.InstanceId], v: (v1.InstanceMetadata | undefined)][]>
}
