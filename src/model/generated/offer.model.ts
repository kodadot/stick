import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, StringColumn as StringColumn_, ManyToOne as ManyToOne_, Index as Index_, DateTimeColumn as DateTimeColumn_, OneToOne as OneToOne_, JoinColumn as JoinColumn_} from "@subsquid/typeorm-store"
import {CollectionEntity} from "./collectionEntity.model"
import {NFTEntity} from "./nftEntity.model"
import {TradeStatus} from "./_tradeStatus"

@Entity_()
export class Offer {
    constructor(props?: Partial<Offer>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @BigIntColumn_({nullable: false})
    blockNumber!: bigint

    @StringColumn_({nullable: false})
    caller!: string

    @Index_()
    @ManyToOne_(() => CollectionEntity, {nullable: true})
    considered!: CollectionEntity

    @DateTimeColumn_({nullable: false})
    createdAt!: Date

    @Index_()
    @ManyToOne_(() => NFTEntity, {nullable: true})
    desired!: NFTEntity | undefined | null

    @BigIntColumn_({nullable: false})
    expiration!: bigint

    @Index_({unique: true})
    @OneToOne_(() => NFTEntity, {nullable: true})
    @JoinColumn_()
    nft!: NFTEntity

    @BigIntColumn_({nullable: false})
    price!: bigint

    @Column_("varchar", {length: 9, nullable: false})
    status!: TradeStatus

    @DateTimeColumn_({nullable: true})
    updatedAt!: Date | undefined | null
}
