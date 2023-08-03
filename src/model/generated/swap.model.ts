import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToOne as OneToOne_, JoinColumn as JoinColumn_} from "typeorm"
import * as marshal from "./marshal"
import {CollectionEntity} from "./collectionEntity.model"
import {NFTEntity} from "./nftEntity.model"
import {SwapSurchargeType} from "./_swapSurchargeType"
import {SwapStatus} from "./_swapStatus"

@Entity_()
export class Swap {
    constructor(props?: Partial<Swap>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    blockNumber!: bigint

    @Column_("text", {nullable: false})
    caller!: string

    @Column_("timestamp with time zone", {nullable: false})
    createdAt!: Date

    @Index_()
    @ManyToOne_(() => CollectionEntity, {nullable: true})
    collection!: CollectionEntity | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    expiration!: bigint

    @Index_()
    @ManyToOne_(() => NFTEntity, {nullable: true})
    item!: NFTEntity | undefined | null

    @Index_({unique: true})
    @OneToOne_(() => NFTEntity, {nullable: false})
    @JoinColumn_()
    nft!: NFTEntity

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    price!: bigint

    @Column_("varchar", {length: 13, nullable: true})
    surcharge!: SwapSurchargeType | undefined | null

    @Column_("varchar", {length: 9, nullable: false})
    status!: SwapStatus

    @Column_("timestamp with time zone", {nullable: true})
    updatedAt!: Date | undefined | null
}
