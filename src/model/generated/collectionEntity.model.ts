import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, Index as Index_, BooleanColumn as BooleanColumn_, DateTimeColumn as DateTimeColumn_, IntColumn as IntColumn_, OneToMany as OneToMany_, ManyToOne as ManyToOne_, FloatColumn as FloatColumn_} from "@subsquid/typeorm-store"
import * as marshal from "./marshal"
import {Attribute} from "./_attribute"
import {CollectionEvent} from "./collectionEvent.model"
import {Kind} from "./_kind"
import {MetadataEntity} from "./metadataEntity.model"
import {NFTEntity} from "./nftEntity.model"
import {CollectionType} from "./_collectionType"
import {CollectionSettings} from "./_collectionSettings"

@Entity_()
export class CollectionEntity {
    constructor(props?: Partial<CollectionEntity>) {
        Object.assign(this, props)
    }

    @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.map((val: any) => val.toJSON()), from: obj => obj == null ? undefined : marshal.fromList(obj, val => new Attribute(undefined, marshal.nonNull(val)))}, nullable: true})
    attributes!: (Attribute)[] | undefined | null

    @StringColumn_({nullable: true})
    baseUri!: string | undefined | null

    @Index_()
    @BigIntColumn_({nullable: true})
    blockNumber!: bigint | undefined | null

    @BooleanColumn_({nullable: false})
    burned!: boolean

    @Index_()
    @DateTimeColumn_({nullable: false})
    createdAt!: Date

    @StringColumn_({nullable: false})
    currentOwner!: string

    @IntColumn_({nullable: false})
    distribution!: number

    @OneToMany_(() => CollectionEvent, e => e.collection)
    events!: CollectionEvent[]

    @Index_()
    @BigIntColumn_({nullable: false})
    floor!: bigint

    @Index_({unique: true})
    @StringColumn_({nullable: false})
    hash!: string

    @Index_()
    @BigIntColumn_({nullable: false})
    highestSale!: bigint

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: true})
    image!: string | undefined | null

    @StringColumn_({nullable: false})
    issuer!: string

    @Column_("varchar", {length: 11, nullable: true})
    kind!: Kind | undefined | null

    @IntColumn_({nullable: true})
    max!: number | undefined | null

    @StringColumn_({nullable: true})
    media!: string | undefined | null

    @Index_()
    @ManyToOne_(() => MetadataEntity, {nullable: true})
    meta!: MetadataEntity | undefined | null

    @StringColumn_({nullable: true})
    metadata!: string | undefined | null

    @Index_()
    @StringColumn_({nullable: true})
    name!: string | undefined | null

    @Index_()
    @IntColumn_({nullable: false})
    nftCount!: number

    @OneToMany_(() => NFTEntity, e => e.collection)
    nfts!: NFTEntity[]

    @IntColumn_({nullable: false})
    ownerCount!: number

    @StringColumn_({nullable: true})
    recipient!: string | undefined | null

    @FloatColumn_({nullable: true})
    royalty!: number | undefined | null

    @Index_()
    @IntColumn_({nullable: false})
    supply!: number

    @Index_()
    @DateTimeColumn_({nullable: false})
    updatedAt!: Date

    @IntColumn_({nullable: false})
    version!: number

    @Index_()
    @BigIntColumn_({nullable: false})
    volume!: bigint

    @Column_("varchar", {length: 8, nullable: true})
    type!: CollectionType | undefined | null

    @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : new CollectionSettings(undefined, obj)}, nullable: true})
    settings!: CollectionSettings | undefined | null
}
