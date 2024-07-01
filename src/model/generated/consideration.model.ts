import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "@subsquid/typeorm-store"
import {CollectionEntity} from "./collectionEntity.model"
import {NFTEntity} from "./nftEntity.model"

@Entity_()
export class Consideration {
    constructor(props?: Partial<Consideration>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => CollectionEntity, {nullable: true})
    collection!: CollectionEntity

    @Index_()
    @ManyToOne_(() => NFTEntity, {nullable: true})
    nft!: NFTEntity | undefined | null
}
