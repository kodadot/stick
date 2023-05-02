import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Interaction} from "./_interaction"
import {CollectionEntity} from "./collectionEntity.model"

@Entity_()
export class CollectionEvent {
    constructor(props?: Partial<CollectionEvent>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    blockNumber!: bigint | undefined | null

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Column_("text", {nullable: false})
    caller!: string

    @Column_("text", {nullable: true})
    currentOwner!: string | undefined | null

    @Column_("varchar", {length: 12, nullable: false})
    interaction!: Interaction

    @Column_("text", {nullable: false})
    meta!: string

    @Index_()
    @ManyToOne_(() => CollectionEntity, {nullable: true})
    collection!: CollectionEntity
}
