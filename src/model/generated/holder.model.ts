import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {CollectionEntity} from "./collectionEntity.model"
import {NFTEntity} from "./nftEntity.model"

@Entity_()
export class Holder {
    constructor(props?: Partial<Holder>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("int4", {nullable: false})
    nftCount!: number

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalSold!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalBought!: bigint

    @Column_("timestamp with time zone", {nullable: false})
    lastActivity!: Date

    @Index_()
    @ManyToOne_(() => CollectionEntity, {nullable: true})
    collection!: CollectionEntity | undefined | null

    @OneToMany_(() => NFTEntity, e => e.holder)
    nfts!: NFTEntity[]
}
