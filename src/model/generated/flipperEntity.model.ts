import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {CollectionEntity} from "./collectionEntity.model"
import {FlipEvent} from "./flipEvent.model"

@Entity_()
export class FlipperEntity {
    constructor(props?: Partial<FlipperEntity>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("text", {nullable: false})
    address!: string

    @Index_()
    @ManyToOne_(() => CollectionEntity, {nullable: true})
    collection!: CollectionEntity

    @OneToMany_(() => FlipEvent, e => e.flipper)
    flips!: FlipEvent[]

    @Column_("int4", {nullable: false})
    owned!: number

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalBought!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalSold!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    bestFlip!: bigint

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date
}
