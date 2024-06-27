import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_, StringColumn as StringColumn_, DateTimeColumn as DateTimeColumn_, IntColumn as IntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"
import {CollectionEntity} from "./collectionEntity.model"
import {NFTEntity} from "./nftEntity.model"
import {MetadataEntity} from "./metadataEntity.model"

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

    @OneToMany_(() => NFTEntity, e => e.token)
    nfts!: NFTEntity[]

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

    @DateTimeColumn_({nullable: false})
    updatedAt!: Date

    @DateTimeColumn_({nullable: false})
    createdAt!: Date

    @IntColumn_({nullable: false})
    supply!: number

    @IntColumn_({nullable: false})
    count!: number

    @BooleanColumn_({nullable: false})
    deleted!: boolean
}
