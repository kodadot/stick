import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"

@Entity_()
export class AssetEntity {
    constructor(props?: Partial<AssetEntity>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("text", {nullable: true})
    name!: string | undefined | null

    @Column_("text", {nullable: true})
    symbol!: string | undefined | null

    @Column_("int4", {nullable: true})
    decimals!: number | undefined | null
}
