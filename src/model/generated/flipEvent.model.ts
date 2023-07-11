import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {FlipperEntity} from "./flipperEntity.model"
import {NFTEntity} from "./nftEntity.model"

@Entity_()
export class FlipEvent {
    constructor(props?: Partial<FlipEvent>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => FlipperEntity, {nullable: true})
    flipper!: FlipperEntity

    @Index_()
    @ManyToOne_(() => NFTEntity, {nullable: true})
    nft!: NFTEntity

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    soldPrice!: bigint | undefined | null

    @Column_("text", {nullable: true})
    soldTo!: string | undefined | null

    @Column_("timestamp with time zone", {nullable: true})
    sellTimestamp!: Date | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    boughtPrice!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    profit!: bigint | undefined | null
}
