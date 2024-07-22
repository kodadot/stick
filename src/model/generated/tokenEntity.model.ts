import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, ManyToOne as ManyToOne_, Index as Index_, IntColumn as IntColumn_, DateTimeColumn as DateTimeColumn_, BooleanColumn as BooleanColumn_, StringColumn as StringColumn_, OneToMany as OneToMany_} from "@subsquid/typeorm-store"
import {CollectionEntity} from "./collectionEntity.model"
import {MetadataEntity} from "./metadataEntity.model"
import {NFTEntity} from "./nftEntity.model"

@Entity_()
export class TokenEntity {
    constructor(props?: Partial<TokenEntity>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @BigIntColumn_({nullable: true})
    blockNumber!: bigint | undefined | null

    @Index_()
    @ManyToOne_(() => CollectionEntity, {nullable: true})
    collection!: CollectionEntity | undefined | null

    @IntColumn_({nullable: false})
    count!: number

    @DateTimeColumn_({nullable: false})
    createdAt!: Date

    @BooleanColumn_({nullable: false})
    deleted!: boolean

    @Index_()
    @StringColumn_({nullable: false})
    hash!: string

    @StringColumn_({nullable: true})
    image!: string | undefined | null

    @StringColumn_({nullable: true})
    media!: string | undefined | null

    @Index_()
    @ManyToOne_(() => MetadataEntity, {nullable: true})
    meta!: MetadataEntity | undefined | null

    @StringColumn_({nullable: true})
    metadata!: string | undefined | null

    @Index_()
    @StringColumn_({nullable: true})
    name!: string | undefined | null

    @OneToMany_(() => NFTEntity, e => e.token)
    nfts!: NFTEntity[]

    @IntColumn_({nullable: false})
    supply!: number

    @DateTimeColumn_({nullable: false})
    updatedAt!: Date
}
