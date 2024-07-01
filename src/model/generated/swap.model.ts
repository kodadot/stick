import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, StringColumn as StringColumn_, DateTimeColumn as DateTimeColumn_, ManyToOne as ManyToOne_, Index as Index_} from "@subsquid/typeorm-store"
import {Consideration} from "./consideration.model"
import {NFTEntity} from "./nftEntity.model"
import {OfferStatus} from "./_offerStatus"
import {Surcharge} from "./_surcharge"

@Entity_()
export class Swap {
    constructor(props?: Partial<Swap>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @BigIntColumn_({nullable: false})
    blockNumber!: bigint

    @StringColumn_({nullable: false})
    caller!: string

    @DateTimeColumn_({nullable: false})
    createdAt!: Date

    @Index_()
    @ManyToOne_(() => Consideration, {nullable: true})
    consideration!: Consideration

    @BigIntColumn_({nullable: false})
    expiration!: bigint

    @Index_()
    @ManyToOne_(() => NFTEntity, {nullable: true})
    nft!: NFTEntity

    @BigIntColumn_({nullable: false})
    price!: bigint

    @Column_("varchar", {length: 9, nullable: false})
    status!: OfferStatus

    @Column_("varchar", {length: 7, nullable: false})
    surcharge!: Surcharge

    @DateTimeColumn_({nullable: true})
    updatedAt!: Date | undefined | null
}
