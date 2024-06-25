import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, ManyToOne as ManyToOne_, Index as Index_} from "@subsquid/typeorm-store"
import {Interaction} from "./_interaction"
import {CollectionEntity} from "./collectionEntity.model"

@Entity_()
export class CollectionEvent {
    constructor(props?: Partial<CollectionEvent>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @BigIntColumn_({nullable: true})
    blockNumber!: bigint | undefined | null

    @DateTimeColumn_({nullable: false})
    timestamp!: Date

    @StringColumn_({nullable: false})
    caller!: string

    @StringColumn_({nullable: true})
    currentOwner!: string | undefined | null

    @Column_("varchar", {length: 12, nullable: false})
    interaction!: Interaction

    @StringColumn_({nullable: false})
    meta!: string

    @Index_()
    @ManyToOne_(() => CollectionEntity, {nullable: true})
    collection!: CollectionEntity
}
