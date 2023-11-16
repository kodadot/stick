import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {Attribute} from "./_attribute"
import {CollectionEvent} from "./collectionEvent.model"
import {MetadataEntity} from "./metadataEntity.model"
import {NFTEntity} from "./nftEntity.model"

@Entity_()
export class CollectionEntity {
    constructor(props?: Partial<CollectionEntity>) {
        Object.assign(this, props)
    }

    @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.map((val: any) => val.toJSON()), from: obj => obj == null ? undefined : marshal.fromList(obj, val => new Attribute(undefined, marshal.nonNull(val)))}, nullable: true})
    attributes!: (Attribute)[] | undefined | null

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    blockNumber!: bigint | undefined | null

    @Column_("bool", {nullable: false})
    burned!: boolean

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    createdAt!: Date

    @Column_("text", {nullable: false})
    currentOwner!: string

    @Column_("int4", {nullable: false})
    distribution!: number

    @OneToMany_(() => CollectionEvent, e => e.collection)
    events!: CollectionEvent[]

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    floor!: bigint

    @Index_({unique: true})
    @Column_("text", {nullable: false})
    hash!: string

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    highestSale!: bigint

    @PrimaryColumn_()
    id!: string

    @Column_("text", {nullable: true})
    image!: string | undefined | null

    @Column_("text", {nullable: false})
    issuer!: string

    @Column_("int4", {nullable: true})
    max!: number | undefined | null

    @Column_("text", {nullable: true})
    media!: string | undefined | null

    @Index_()
    @ManyToOne_(() => MetadataEntity, {nullable: true})
    meta!: MetadataEntity | undefined | null

    @Column_("text", {nullable: true})
    metadata!: string | undefined | null

    @Index_()
    @Column_("text", {nullable: true})
    name!: string | undefined | null

    @Index_()
    @Column_("int4", {nullable: false})
    nftCount!: number

    @OneToMany_(() => NFTEntity, e => e.collection)
    nfts!: NFTEntity[]

    @Column_("int4", {nullable: false})
    ownerCount!: number

    @Column_("text", {nullable: true})
    recipient!: string | undefined | null

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    royalty!: number | undefined | null

    @Index_()
    @Column_("int4", {nullable: false})
    supply!: number

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    updatedAt!: Date

    @Column_("int4", {nullable: false})
    version!: number

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    volume!: bigint
}
