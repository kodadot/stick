import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result, Option} from './support'

export class UniquesAttributeClearedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.AttributeCleared')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Attribute metadata has been cleared for an asset class or instance.
     * \[ class, maybe_instance, key, maybe_value \]
     */
    get isV601(): boolean {
        return this._chain.getEventHash('Uniques.AttributeCleared') === '885b4dbb6c48840d1cb04f9f8a73f65455ff8e630c9692e7b8efbb5abf341a92'
    }

    /**
     * Attribute metadata has been cleared for an asset class or instance.
     * \[ class, maybe_instance, key, maybe_value \]
     */
    get asV601(): [number, (number | undefined), Uint8Array] {
        assert(this.isV601)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Attribute metadata has been cleared for an asset class or instance.
     */
    get isV700(): boolean {
        return this._chain.getEventHash('Uniques.AttributeCleared') === '91aa106b700026eb59ef1d86cbd22766539a996d1d1d5cb5dbbdc18439ff1283'
    }

    /**
     * Attribute metadata has been cleared for an asset class or instance.
     */
    get asV700(): {class: number, maybeInstance: (number | undefined), key: Uint8Array} {
        assert(this.isV700)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Attribute metadata has been cleared for a `collection` or `item`.
     */
    get isV9230(): boolean {
        return this._chain.getEventHash('Uniques.AttributeCleared') === 'c330ddd00fb87b92c796bc29cff6edf2ce546dd8eb98420ac23c5cbe7b0e11d1'
    }

    /**
     * Attribute metadata has been cleared for a `collection` or `item`.
     */
    get asV9230(): {collection: number, maybeItem: (number | undefined), key: Uint8Array} {
        assert(this.isV9230)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesAttributeSetEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.AttributeSet')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * New attribute metadata has been set for an asset class or instance.
     * \[ class, maybe_instance, key, value \]
     */
    get isV601(): boolean {
        return this._chain.getEventHash('Uniques.AttributeSet') === '135c19d2cf1f530340d3fe938fdcce6ca358d729cfc69ce595cc57b640136a76'
    }

    /**
     * New attribute metadata has been set for an asset class or instance.
     * \[ class, maybe_instance, key, value \]
     */
    get asV601(): [number, (number | undefined), Uint8Array, Uint8Array] {
        assert(this.isV601)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * New attribute metadata has been set for an asset class or instance.
     */
    get isV700(): boolean {
        return this._chain.getEventHash('Uniques.AttributeSet') === '6ae49a979267c094bc35bda051f5467e62472724b598a2f5ee5720a5111b8623'
    }

    /**
     * New attribute metadata has been set for an asset class or instance.
     */
    get asV700(): {class: number, maybeInstance: (number | undefined), key: Uint8Array, value: Uint8Array} {
        assert(this.isV700)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * New attribute metadata has been set for a `collection` or `item`.
     */
    get isV9230(): boolean {
        return this._chain.getEventHash('Uniques.AttributeSet') === 'b7e65dbf62f10e9415ffa560bff4954ffeb28994c9cf350ecd59fe98850d8783'
    }

    /**
     * New attribute metadata has been set for a `collection` or `item`.
     */
    get asV9230(): {collection: number, maybeItem: (number | undefined), key: Uint8Array, value: Uint8Array} {
        assert(this.isV9230)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesBurnedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.Burned')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * An asset `instance` was destroyed. \[ class, instance, owner \]
     */
    get isV601(): boolean {
        return this._chain.getEventHash('Uniques.Burned') === '7b53bb12306431c6ff23a3ea3466183ed1c7f4ecb417f6e8467ae0c63cbc2f88'
    }

    /**
     * An asset `instance` was destroyed. \[ class, instance, owner \]
     */
    get asV601(): [number, number, Uint8Array] {
        assert(this.isV601)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * An asset `instance` was destroyed.
     */
    get isV700(): boolean {
        return this._chain.getEventHash('Uniques.Burned') === '448723f6c40490fe04ab8e6d9e382432b7ce5c075d05af60c076b9f6a8a9e510'
    }

    /**
     * An asset `instance` was destroyed.
     */
    get asV700(): {class: number, instance: number, owner: Uint8Array} {
        assert(this.isV700)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * An `item` was destroyed.
     */
    get isV9230(): boolean {
        return this._chain.getEventHash('Uniques.Burned') === '281c96f4233cbe042ed549cfca1fafa833d625f8d832ed29682ac34cdceb017d'
    }

    /**
     * An `item` was destroyed.
     */
    get asV9230(): {collection: number, item: number, owner: Uint8Array} {
        assert(this.isV9230)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesClassFrozenEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.ClassFrozen')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some asset `class` was frozen. \[ class \]
     */
    get isV601(): boolean {
        return this._chain.getEventHash('Uniques.ClassFrozen') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
    }

    /**
     * Some asset `class` was frozen. \[ class \]
     */
    get asV601(): number {
        assert(this.isV601)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Some asset `class` was frozen.
     */
    get isV700(): boolean {
        return this._chain.getEventHash('Uniques.ClassFrozen') === '4f045c4df2d4b9045175427f6f6aa548cd3ad56207f700b68254d3b77d944310'
    }

    /**
     * Some asset `class` was frozen.
     */
    get asV700(): {class: number} {
        assert(this.isV700)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesClassMetadataClearedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.ClassMetadataCleared')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Metadata has been cleared for an asset class. \[ class \]
     */
    get isV601(): boolean {
        return this._chain.getEventHash('Uniques.ClassMetadataCleared') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
    }

    /**
     * Metadata has been cleared for an asset class. \[ class \]
     */
    get asV601(): number {
        assert(this.isV601)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Metadata has been cleared for an asset class.
     */
    get isV700(): boolean {
        return this._chain.getEventHash('Uniques.ClassMetadataCleared') === '4f045c4df2d4b9045175427f6f6aa548cd3ad56207f700b68254d3b77d944310'
    }

    /**
     * Metadata has been cleared for an asset class.
     */
    get asV700(): {class: number} {
        assert(this.isV700)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesClassMetadataSetEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.ClassMetadataSet')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * New metadata has been set for an asset class. \[ class, data, is_frozen \]
     */
    get isV601(): boolean {
        return this._chain.getEventHash('Uniques.ClassMetadataSet') === '5792f3fb3e6c02cd51090283e81fd6d6cf13fe8a50876dcc428a6b9314aa3f72'
    }

    /**
     * New metadata has been set for an asset class. \[ class, data, is_frozen \]
     */
    get asV601(): [number, Uint8Array, boolean] {
        assert(this.isV601)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * New metadata has been set for an asset class.
     */
    get isV700(): boolean {
        return this._chain.getEventHash('Uniques.ClassMetadataSet') === '151c432def6b2dc27880b815773b729a1ceb58295a326de4c16e57901c2a9476'
    }

    /**
     * New metadata has been set for an asset class.
     */
    get asV700(): {class: number, data: Uint8Array, isFrozen: boolean} {
        assert(this.isV700)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesClassThawedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.ClassThawed')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some asset `class` was thawed. \[ class \]
     */
    get isV601(): boolean {
        return this._chain.getEventHash('Uniques.ClassThawed') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
    }

    /**
     * Some asset `class` was thawed. \[ class \]
     */
    get asV601(): number {
        assert(this.isV601)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Some asset `class` was thawed.
     */
    get isV700(): boolean {
        return this._chain.getEventHash('Uniques.ClassThawed') === '4f045c4df2d4b9045175427f6f6aa548cd3ad56207f700b68254d3b77d944310'
    }

    /**
     * Some asset `class` was thawed.
     */
    get asV700(): {class: number} {
        assert(this.isV700)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesCollectionFrozenEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.CollectionFrozen')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some `collection` was frozen.
     */
    get isV9230(): boolean {
        return this._chain.getEventHash('Uniques.CollectionFrozen') === 'a84ae2f0e555d689a7b5b0ee2914bd693902b07afc4f268377240f6ac92495cb'
    }

    /**
     * Some `collection` was frozen.
     */
    get asV9230(): {collection: number} {
        assert(this.isV9230)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesCollectionMaxSupplySetEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.CollectionMaxSupplySet')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Max supply has been set for a collection.
     */
    get isV9230(): boolean {
        return this._chain.getEventHash('Uniques.CollectionMaxSupplySet') === '165991456bc3c6a81994ce513fdf36c2303f5220829f5e8caafbf821233135b4'
    }

    /**
     * Max supply has been set for a collection.
     */
    get asV9230(): {collection: number, maxSupply: number} {
        assert(this.isV9230)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesCollectionMetadataClearedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.CollectionMetadataCleared')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Metadata has been cleared for a `collection`.
     */
    get isV9230(): boolean {
        return this._chain.getEventHash('Uniques.CollectionMetadataCleared') === 'a84ae2f0e555d689a7b5b0ee2914bd693902b07afc4f268377240f6ac92495cb'
    }

    /**
     * Metadata has been cleared for a `collection`.
     */
    get asV9230(): {collection: number} {
        assert(this.isV9230)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesCollectionMetadataSetEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.CollectionMetadataSet')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * New metadata has been set for a `collection`.
     */
    get isV9230(): boolean {
        return this._chain.getEventHash('Uniques.CollectionMetadataSet') === '63ef75086da73b45ed287cac6640abbebd40222433fb8fae9e4fa1bfa173afc2'
    }

    /**
     * New metadata has been set for a `collection`.
     */
    get asV9230(): {collection: number, data: Uint8Array, isFrozen: boolean} {
        assert(this.isV9230)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesCollectionThawedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.CollectionThawed')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some `collection` was thawed.
     */
    get isV9230(): boolean {
        return this._chain.getEventHash('Uniques.CollectionThawed') === 'a84ae2f0e555d689a7b5b0ee2914bd693902b07afc4f268377240f6ac92495cb'
    }

    /**
     * Some `collection` was thawed.
     */
    get asV9230(): {collection: number} {
        assert(this.isV9230)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesCreatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.Created')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * An asset class was created. \[ class, creator, owner \]
     */
    get isV601(): boolean {
        return this._chain.getEventHash('Uniques.Created') === 'f968eb148e0dc7739feb64d5c72eea0de823dbf44259d08f9a6218f8117bf19a'
    }

    /**
     * An asset class was created. \[ class, creator, owner \]
     */
    get asV601(): [number, Uint8Array, Uint8Array] {
        assert(this.isV601)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * An asset class was created.
     */
    get isV700(): boolean {
        return this._chain.getEventHash('Uniques.Created') === '7f77877d6861fb103cb861e568c28c6112b4f0daecbb1931ca2b5d4e733fdacd'
    }

    /**
     * An asset class was created.
     */
    get asV700(): {class: number, creator: Uint8Array, owner: Uint8Array} {
        assert(this.isV700)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A `collection` was created.
     */
    get isV9230(): boolean {
        return this._chain.getEventHash('Uniques.Created') === 'a5c293082b1f3ffb16eaecc5b8d430ca1bb8c7bd090079ebcefcbf303cbfec61'
    }

    /**
     * A `collection` was created.
     */
    get asV9230(): {collection: number, creator: Uint8Array, owner: Uint8Array} {
        assert(this.isV9230)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesDestroyedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.Destroyed')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * An asset `class` was destroyed. \[ class \]
     */
    get isV601(): boolean {
        return this._chain.getEventHash('Uniques.Destroyed') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
    }

    /**
     * An asset `class` was destroyed. \[ class \]
     */
    get asV601(): number {
        assert(this.isV601)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * An asset `class` was destroyed.
     */
    get isV700(): boolean {
        return this._chain.getEventHash('Uniques.Destroyed') === '4f045c4df2d4b9045175427f6f6aa548cd3ad56207f700b68254d3b77d944310'
    }

    /**
     * An asset `class` was destroyed.
     */
    get asV700(): {class: number} {
        assert(this.isV700)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A `collection` was destroyed.
     */
    get isV9230(): boolean {
        return this._chain.getEventHash('Uniques.Destroyed') === 'a84ae2f0e555d689a7b5b0ee2914bd693902b07afc4f268377240f6ac92495cb'
    }

    /**
     * A `collection` was destroyed.
     */
    get asV9230(): {collection: number} {
        assert(this.isV9230)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesForceCreatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.ForceCreated')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * An asset class was force-created. \[ class, owner \]
     */
    get isV601(): boolean {
        return this._chain.getEventHash('Uniques.ForceCreated') === '0379562584d6426ccff49705dfa9dba95ad94215b772fd97d0ad0c4ca0001c12'
    }

    /**
     * An asset class was force-created. \[ class, owner \]
     */
    get asV601(): [number, Uint8Array] {
        assert(this.isV601)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * An asset class was force-created.
     */
    get isV700(): boolean {
        return this._chain.getEventHash('Uniques.ForceCreated') === 'd51b7ff0e8d25eeb64fd1351f5eafbd20c22e12baddedd443f9831da21e235ea'
    }

    /**
     * An asset class was force-created.
     */
    get asV700(): {class: number, owner: Uint8Array} {
        assert(this.isV700)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * A `collection` was force-created.
     */
    get isV9230(): boolean {
        return this._chain.getEventHash('Uniques.ForceCreated') === '6059bcf1dd7c48dc760f017d00a2c7c6719e745b3de9bde2046cbe26347c562f'
    }

    /**
     * A `collection` was force-created.
     */
    get asV9230(): {collection: number, owner: Uint8Array} {
        assert(this.isV9230)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesFrozenEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.Frozen')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some asset `instance` was frozen. \[ class, instance \]
     */
    get isV601(): boolean {
        return this._chain.getEventHash('Uniques.Frozen') === 'a09602e40984745a7411a1855af06d133893a422fd68f7bdc4fb6a56bf1a3645'
    }

    /**
     * Some asset `instance` was frozen. \[ class, instance \]
     */
    get asV601(): [number, number] {
        assert(this.isV601)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Some asset `instance` was frozen.
     */
    get isV700(): boolean {
        return this._chain.getEventHash('Uniques.Frozen') === '4aec04ec96e3cd667bd16926634d063c18da9922e4d645f33692574e196c20dc'
    }

    /**
     * Some asset `instance` was frozen.
     */
    get asV700(): {class: number, instance: number} {
        assert(this.isV700)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Some `item` was frozen.
     */
    get isV9230(): boolean {
        return this._chain.getEventHash('Uniques.Frozen') === 'ac39ace3905de6db862660444374575fb7ed5f403845b475c7f2addc21c71f91'
    }

    /**
     * Some `item` was frozen.
     */
    get asV9230(): {collection: number, item: number} {
        assert(this.isV9230)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesIssuedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.Issued')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * An asset `instance` was issued. \[ class, instance, owner \]
     */
    get isV601(): boolean {
        return this._chain.getEventHash('Uniques.Issued') === '7b53bb12306431c6ff23a3ea3466183ed1c7f4ecb417f6e8467ae0c63cbc2f88'
    }

    /**
     * An asset `instance` was issued. \[ class, instance, owner \]
     */
    get asV601(): [number, number, Uint8Array] {
        assert(this.isV601)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * An asset `instance` was issued.
     */
    get isV700(): boolean {
        return this._chain.getEventHash('Uniques.Issued') === '448723f6c40490fe04ab8e6d9e382432b7ce5c075d05af60c076b9f6a8a9e510'
    }

    /**
     * An asset `instance` was issued.
     */
    get asV700(): {class: number, instance: number, owner: Uint8Array} {
        assert(this.isV700)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * An `item` was issued.
     */
    get isV9230(): boolean {
        return this._chain.getEventHash('Uniques.Issued') === '281c96f4233cbe042ed549cfca1fafa833d625f8d832ed29682ac34cdceb017d'
    }

    /**
     * An `item` was issued.
     */
    get asV9230(): {collection: number, item: number, owner: Uint8Array} {
        assert(this.isV9230)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesItemBoughtEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.ItemBought')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * An item was bought.
     */
    get isV9270(): boolean {
        return this._chain.getEventHash('Uniques.ItemBought') === 'db915144f3a96c73a3031d37c874507dcac06fd77bca9962f672bc9bfb557489'
    }

    /**
     * An item was bought.
     */
    get asV9270(): {collection: number, item: number, price: bigint, seller: Uint8Array, buyer: Uint8Array} {
        assert(this.isV9270)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesItemPriceRemovedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.ItemPriceRemoved')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * The price for the instance was removed.
     */
    get isV9270(): boolean {
        return this._chain.getEventHash('Uniques.ItemPriceRemoved') === 'ac39ace3905de6db862660444374575fb7ed5f403845b475c7f2addc21c71f91'
    }

    /**
     * The price for the instance was removed.
     */
    get asV9270(): {collection: number, item: number} {
        assert(this.isV9270)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesItemPriceSetEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.ItemPriceSet')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * The price was set for the instance.
     */
    get isV9270(): boolean {
        return this._chain.getEventHash('Uniques.ItemPriceSet') === '10d4911c332080c5a5c1e6c248347d1174817ab96906747e2c40df18c5381944'
    }

    /**
     * The price was set for the instance.
     */
    get asV9270(): {collection: number, item: number, price: bigint, whitelistedBuyer: (Uint8Array | undefined)} {
        assert(this.isV9270)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesMetadataClearedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.MetadataCleared')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Metadata has been cleared for an asset instance. \[ class, instance \]
     */
    get isV601(): boolean {
        return this._chain.getEventHash('Uniques.MetadataCleared') === 'a09602e40984745a7411a1855af06d133893a422fd68f7bdc4fb6a56bf1a3645'
    }

    /**
     * Metadata has been cleared for an asset instance. \[ class, instance \]
     */
    get asV601(): [number, number] {
        assert(this.isV601)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Metadata has been cleared for an asset instance.
     */
    get isV700(): boolean {
        return this._chain.getEventHash('Uniques.MetadataCleared') === '4aec04ec96e3cd667bd16926634d063c18da9922e4d645f33692574e196c20dc'
    }

    /**
     * Metadata has been cleared for an asset instance.
     */
    get asV700(): {class: number, instance: number} {
        assert(this.isV700)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Metadata has been cleared for an item.
     */
    get isV9230(): boolean {
        return this._chain.getEventHash('Uniques.MetadataCleared') === 'ac39ace3905de6db862660444374575fb7ed5f403845b475c7f2addc21c71f91'
    }

    /**
     * Metadata has been cleared for an item.
     */
    get asV9230(): {collection: number, item: number} {
        assert(this.isV9230)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesMetadataSetEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.MetadataSet')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * New metadata has been set for an asset instance.
     * \[ class, instance, data, is_frozen \]
     */
    get isV601(): boolean {
        return this._chain.getEventHash('Uniques.MetadataSet') === '7895150acb61111b7c6318ded185579b696175877e3d9b7bae2664d131eb3e65'
    }

    /**
     * New metadata has been set for an asset instance.
     * \[ class, instance, data, is_frozen \]
     */
    get asV601(): [number, number, Uint8Array, boolean] {
        assert(this.isV601)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * New metadata has been set for an asset instance.
     */
    get isV700(): boolean {
        return this._chain.getEventHash('Uniques.MetadataSet') === '8d2f67e787668073bdb66a4b7bbba97ea22da0860f46bce7884b446fd055419a'
    }

    /**
     * New metadata has been set for an asset instance.
     */
    get asV700(): {class: number, instance: number, data: Uint8Array, isFrozen: boolean} {
        assert(this.isV700)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * New metadata has been set for an item.
     */
    get isV9230(): boolean {
        return this._chain.getEventHash('Uniques.MetadataSet') === 'dc2370253c17fe69445af313af0113a31f244cc51324e5a3b4b0b98804f91a6f'
    }

    /**
     * New metadata has been set for an item.
     */
    get asV9230(): {collection: number, item: number, data: Uint8Array, isFrozen: boolean} {
        assert(this.isV9230)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesOwnerChangedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.OwnerChanged')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * The owner changed \[ class, new_owner \]
     */
    get isV601(): boolean {
        return this._chain.getEventHash('Uniques.OwnerChanged') === '0379562584d6426ccff49705dfa9dba95ad94215b772fd97d0ad0c4ca0001c12'
    }

    /**
     * The owner changed \[ class, new_owner \]
     */
    get asV601(): [number, Uint8Array] {
        assert(this.isV601)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * The owner changed.
     */
    get isV700(): boolean {
        return this._chain.getEventHash('Uniques.OwnerChanged') === '7f21331ba73970553e198c5598e55e9857317b38adaa7f293e914882bdd7385c'
    }

    /**
     * The owner changed.
     */
    get asV700(): {class: number, newOwner: Uint8Array} {
        assert(this.isV700)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * The owner changed.
     */
    get isV9230(): boolean {
        return this._chain.getEventHash('Uniques.OwnerChanged') === '0331b0b161c2f2db690f574540ade7765af19f5306dc65443561fbaa5825f323'
    }

    /**
     * The owner changed.
     */
    get asV9230(): {collection: number, newOwner: Uint8Array} {
        assert(this.isV9230)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesOwnershipAcceptanceChangedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.OwnershipAcceptanceChanged')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Ownership acceptance has changed for an account.
     */
    get isV900(): boolean {
        return this._chain.getEventHash('Uniques.OwnershipAcceptanceChanged') === '78fde0ff8f56c4ebcc47231a34e394471cbf03f4b56f9fa6854cecafab37242d'
    }

    /**
     * Ownership acceptance has changed for an account.
     */
    get asV900(): {who: Uint8Array, maybeClass: (number | undefined)} {
        assert(this.isV900)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Ownership acceptance has changed for an account.
     */
    get isV9230(): boolean {
        return this._chain.getEventHash('Uniques.OwnershipAcceptanceChanged') === '62f0a146ea419b03ef3bb5c912782af0253639ca8fc47ff318396bedef2230cc'
    }

    /**
     * Ownership acceptance has changed for an account.
     */
    get asV9230(): {who: Uint8Array, maybeCollection: (number | undefined)} {
        assert(this.isV9230)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesTeamChangedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.TeamChanged')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * The management team changed \[ class, issuer, admin, freezer \]
     */
    get isV601(): boolean {
        return this._chain.getEventHash('Uniques.TeamChanged') === '608cf8b84887966db26c958a6b826fd41d8e098263ce7eaae9a421f1f8b1bd56'
    }

    /**
     * The management team changed \[ class, issuer, admin, freezer \]
     */
    get asV601(): [number, Uint8Array, Uint8Array, Uint8Array] {
        assert(this.isV601)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * The management team changed.
     */
    get isV700(): boolean {
        return this._chain.getEventHash('Uniques.TeamChanged') === 'ed55b7c512c680f9a9b8f35a0e603e101cd439e8b1c07373e1b6b2ca40d032f7'
    }

    /**
     * The management team changed.
     */
    get asV700(): {class: number, issuer: Uint8Array, admin: Uint8Array, freezer: Uint8Array} {
        assert(this.isV700)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * The management team changed.
     */
    get isV9230(): boolean {
        return this._chain.getEventHash('Uniques.TeamChanged') === '152cd89e42995f09fd841e2eeec18a6a0ca02740e481dc98e45b182742b5172e'
    }

    /**
     * The management team changed.
     */
    get asV9230(): {collection: number, issuer: Uint8Array, admin: Uint8Array, freezer: Uint8Array} {
        assert(this.isV9230)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesThawedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.Thawed')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some asset `instance` was thawed. \[ class, instance \]
     */
    get isV601(): boolean {
        return this._chain.getEventHash('Uniques.Thawed') === 'a09602e40984745a7411a1855af06d133893a422fd68f7bdc4fb6a56bf1a3645'
    }

    /**
     * Some asset `instance` was thawed. \[ class, instance \]
     */
    get asV601(): [number, number] {
        assert(this.isV601)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Some asset `instance` was thawed.
     */
    get isV700(): boolean {
        return this._chain.getEventHash('Uniques.Thawed') === '4aec04ec96e3cd667bd16926634d063c18da9922e4d645f33692574e196c20dc'
    }

    /**
     * Some asset `instance` was thawed.
     */
    get asV700(): {class: number, instance: number} {
        assert(this.isV700)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Some `item` was thawed.
     */
    get isV9230(): boolean {
        return this._chain.getEventHash('Uniques.Thawed') === 'ac39ace3905de6db862660444374575fb7ed5f403845b475c7f2addc21c71f91'
    }

    /**
     * Some `item` was thawed.
     */
    get asV9230(): {collection: number, item: number} {
        assert(this.isV9230)
        return this._chain.decodeEvent(this.event)
    }
}

export class UniquesTransferredEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Uniques.Transferred')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * An asset `instance` was transferred. \[ class, instance, from, to \]
     */
    get isV601(): boolean {
        return this._chain.getEventHash('Uniques.Transferred') === '5d3fa4f2b87c3626df0e27d53288bc8519502854bcd4a4f83b5b48102417e8d1'
    }

    /**
     * An asset `instance` was transferred. \[ class, instance, from, to \]
     */
    get asV601(): [number, number, Uint8Array, Uint8Array] {
        assert(this.isV601)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * An asset `instance` was transferred.
     */
    get isV700(): boolean {
        return this._chain.getEventHash('Uniques.Transferred') === '62805427bf03dcd5763c135e667e4d08319c26623a7eecd16e8463cac99132b0'
    }

    /**
     * An asset `instance` was transferred.
     */
    get asV700(): {class: number, instance: number, from: Uint8Array, to: Uint8Array} {
        assert(this.isV700)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * An `item` was transferred.
     */
    get isV9230(): boolean {
        return this._chain.getEventHash('Uniques.Transferred') === 'ac8c1c5a1df2a464e3447d13d6c43a813112a33c144f93775b934b08c086bf7a'
    }

    /**
     * An `item` was transferred.
     */
    get asV9230(): {collection: number, item: number, from: Uint8Array, to: Uint8Array} {
        assert(this.isV9230)
        return this._chain.decodeEvent(this.event)
    }
}
