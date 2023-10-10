import { Field, ObjectType, registerEnumType } from 'type-graphql';


export enum OrderBy {
    blockNumber_ASC = "blockNumber_ASC",
    blockNumber_DESC = "blockNumber_DESC",
    updatedAt_ASC = "updatedAt_ASC",
    updatedAt_DESC = "updatedAt_DESC",
    createdAt_ASC = "createdAt_ASC",
    createdAt_DESC = "createdAt_DESC",
    price_ASC = "price_ASC",
    price_DESC = "price_DESC",

}

registerEnumType(OrderBy, {
    name: "OrderBy",
    description: "Order by options for sorting results",
});


@ObjectType()
class Cheapest {
    @Field(() => String, { nullable: true })
    id!: string;

    @Field(() => BigInt, { nullable: true })
    price!: bigint;
}

@ObjectType()
class Collection {
    @Field(() => String, { nullable: true })
    id!: string;

    @Field(() => String, { nullable: true })
    name!: string;
}


@ObjectType()
 class PartialMetadataEntity {
    @Field(() => String, { nullable: false })
    id!: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => String, { nullable: true })
    image?: string;

    @Field(() => String, { nullable: true })
    animationUrl?: string;
}

@ObjectType()
export class TokenEntityModel {
    @Field(() => String, { nullable: false })
    id!: string;

    @Field(() => String, { nullable: false })
    name!: string;

    @Field(() => String, { nullable: true })
    image!: string;

    @Field(() => String, { nullable: true })
    media!: string;

    @Field(() => String, { nullable: true })
    metadata?: string;

    @Field(() => PartialMetadataEntity, { nullable: true })
    meta?: PartialMetadataEntity;

    @Field(() => Date, { nullable: false })
    createdAt!: Date;

    @Field(() => Date, { nullable: false })
    updatedAt!: Date;

    @Field(() => BigInt, { nullable: false })
    blockNumber!: bigint;

    @Field(() => Number, { nullable: false })
    count!: number;

    @Field(() => Number, { nullable: false })
    supply!: number;

    @Field(() => Cheapest)
    cheapest!: Cheapest;

    @Field(() => Collection)
    collection!: Collection;


    constructor(props: Partial<TokenEntityModel>) {
        Object.assign(this, props);
    }
}

@ObjectType()
export class TokenEntityQueryResult {
    @Field(() => String, { nullable: false })
    id!: string;

    @Field(() => String, { nullable: false })
    name!: string;

    @Field(() => String, { nullable: true })
    image!: string;

    @Field(() => String, { nullable: true })
    media!: string;

    @Field(() => Date, { nullable: false })
    created_at!: Date;

    @Field(() => Date, { nullable: false })
    updated_at!: Date;

    @Field(() => BigInt, { nullable: false })
    block_number!: bigint;

    @Field(() => Number, { nullable: false })
    count!: number;

    @Field(() => Number, { nullable: false })
    supply!: number;

    @Field(() => String, { nullable: true })
    cheapest_id!: string;

    @Field(() => BigInt, { nullable: true })
    cheapest_price!: bigint;

    @Field(() => String, { nullable: false })
    collection_id!: string;

    @Field(() => String, { nullable: false })
    collection_name!: string;

    @Field(() => String, { nullable: false })
    meta_id!: string;

    @Field(() => String, { nullable: true })
    meta_description?: string;

    @Field(() => String, { nullable: true })
    meta_image?: string;

    @Field(() => String, { nullable: true })
    meta_animation_url?: string;




    constructor(props: Partial<TokenEntityModel>) {
        Object.assign(this, props);
    }
}

