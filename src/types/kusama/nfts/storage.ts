import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v9420 from '../v9420'

export const collection =  {
    /**
     *  Details of a collection.
     */
    v9420: new StorageType('Nfts.Collection', 'Optional', [sts.number()], v9420.Type_348) as CollectionV9420,
}

/**
 *  Details of a collection.
 */
export interface CollectionV9420  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v9420.Type_348 | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v9420.Type_348 | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v9420.Type_348 | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v9420.Type_348 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v9420.Type_348 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v9420.Type_348 | undefined)][]>
}

export const itemMetadataOf =  {
    /**
     *  Metadata of an item.
     */
    v9420: new StorageType('Nfts.ItemMetadataOf', 'Optional', [sts.number(), sts.number()], v9420.Type_358) as ItemMetadataOfV9420,
}

/**
 *  Metadata of an item.
 */
export interface ItemMetadataOfV9420  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: number, key2: number): Promise<(v9420.Type_358 | undefined)>
    getMany(block: Block, keys: [number, number][]): Promise<(v9420.Type_358 | undefined)[]>
    getKeys(block: Block): Promise<[number, number][]>
    getKeys(block: Block, key1: number): Promise<[number, number][]>
    getKeys(block: Block, key1: number, key2: number): Promise<[number, number][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: number): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: number, key2: number): AsyncIterable<[number, number][]>
    getPairs(block: Block): Promise<[k: [number, number], v: (v9420.Type_358 | undefined)][]>
    getPairs(block: Block, key1: number): Promise<[k: [number, number], v: (v9420.Type_358 | undefined)][]>
    getPairs(block: Block, key1: number, key2: number): Promise<[k: [number, number], v: (v9420.Type_358 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [number, number], v: (v9420.Type_358 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: number): AsyncIterable<[k: [number, number], v: (v9420.Type_358 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: number, key2: number): AsyncIterable<[k: [number, number], v: (v9420.Type_358 | undefined)][]>
}
