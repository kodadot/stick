import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_, OneToMany as OneToMany_} from "typeorm"
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

    @Index_({unique: true})
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    blockNumber!: bigint | undefined | null

    @Column_("bool", {nullable: false})
    burned!: boolean

    @Index_()
    @ManyToOne_(() => CollectionEntity, {nullable: true})
    collection!: CollectionEntity

    @Column_("timestamp with time zone", {nullable: false})
    createdAt!: Date

    @Index_()
    @Column_("text", {nullable: false})
    currentOwner!: string

    @OneToMany_(() => Event, e => e.nft)
    events!: Event[]

    @Index_()
    @Column_("text", {nullable: false})
    hash!: string

    @PrimaryColumn_()
    id!: string

    @Column_("text", {nullable: true})
    image!: string | undefined | null

    @Column_("text", {nullable: false})
    issuer!: string

    @Column_("bool", {nullable: false})
    lewd!: boolean

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
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    price!: bigint | undefined | null

    @Column_("text", {nullable: true})
    recipient!: string | undefined | null

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    royalty!: number | undefined | null

    @Index_()
    @Column_("text", {nullable: false})
    sn!: string

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    updatedAt!: Date

    @Column_("int4", {nullable: false})
    version!: number

    @Index_()
    @ManyToOne_(() => TokenEntity, {nullable: true})
    token!: TokenEntity
}
