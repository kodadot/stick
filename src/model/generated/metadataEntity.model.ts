import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_} from "@subsquid/typeorm-store"
import * as marshal from "./marshal"
import {Attribute} from "./_attribute"
import {Kind} from "./_kind"

@Entity_()
export class MetadataEntity {
    constructor(props?: Partial<MetadataEntity>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: true})
    name!: string | undefined | null

    @StringColumn_({nullable: true})
    description!: string | undefined | null

    @StringColumn_({nullable: true})
    image!: string | undefined | null

    @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.map((val: any) => val.toJSON()), from: obj => obj == null ? undefined : marshal.fromList(obj, val => new Attribute(undefined, marshal.nonNull(val)))}, nullable: true})
    attributes!: (Attribute)[] | undefined | null

    @StringColumn_({nullable: true})
    animationUrl!: string | undefined | null

    @StringColumn_({nullable: true})
    type!: string | undefined | null

    @StringColumn_({nullable: true})
    banner!: string | undefined | null

    @Column_("varchar", {length: 6, nullable: true})
    kind!: Kind | undefined | null
}
