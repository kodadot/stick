import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, Index as Index_, BooleanColumn as BooleanColumn_, ManyToOne as ManyToOne_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, OneToMany as OneToMany_, FloatColumn as FloatColumn_, IntColumn as IntColumn_} from "@subsquid/typeorm-store"
import * as marshal from "./marshal"
import {Attribute} from "./_attribute"
import {CollectionEntity} from "./collectionEntity.model"
import {Event} from "./event.model"
import {MetadataEntity} from "./metadataEntity.model"
import {TokenEntity} from "./tokenEntity.model"

@Entity_()
export class NFTEntity {
    constructor(props?: Partial<NFTEntity>) {
        Object.assign(this, props)
    }

    @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.map((val: any) => val.toJSON()), from: obj => obj == null ? undefined : marshal.fromList(obj, val => new Attribute(undefined, marshal.nonNull(val)))}, nullable: true})
    attributes!: (Attribute)[] | undefined | null

    @Index_()
    @BigIntColumn_({nullable: true})
    blockNumber!: bigint | undefined | null

    @BooleanColumn_({nullable: false})
    burned!: boolean

    @Index_()
    @ManyToOne_(() => CollectionEntity, {nullable: true})
    collection!: CollectionEntity

    @Index_()
    @DateTimeColumn_({nullable: false})
    createdAt!: Date

    @Index_()
    @StringColumn_({nullable: false})
    currentOwner!: string

    @OneToMany_(() => Event, e => e.nft)
    events!: Event[]

    @Index_()
    @StringColumn_({nullable: false})
    hash!: string

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: true})
    image!: string | undefined | null

    @StringColumn_({nullable: false})
    issuer!: string

    @BooleanColumn_({nullable: false})
    lewd!: boolean

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
    @BigIntColumn_({nullable: true})
    price!: bigint | undefined | null

    @StringColumn_({nullable: true})
    recipient!: string | undefined | null

    @FloatColumn_({nullable: true})
    royalty!: number | undefined | null

    @Index_()
    @BigIntColumn_({nullable: false})
    sn!: bigint

    @Index_()
    @DateTimeColumn_({nullable: false})
    updatedAt!: Date

    @IntColumn_({nullable: false})
    version!: number

    @Index_()
    @ManyToOne_(() => TokenEntity, {nullable: true})
    token!: TokenEntity | undefined | null
}
