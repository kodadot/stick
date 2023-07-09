import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {CollectionEntity} from "./collectionEntity.model"
import {NFTEntity} from "./nftEntity.model"

@Entity_()
export class HolderActivity {
    constructor(props?: Partial<HolderActivity>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("text", {nullable: false})
    holder!: string

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
    collection!: CollectionEntity

    @OneToMany_(() => NFTEntity, e => e.holder)
    nfts!: NFTEntity[]
}
