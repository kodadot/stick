import { Field, ObjectType, registerEnumType} from 'type-graphql';


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
class CheapestNFT {
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
export class TokenEntityByOwner {
    @Field(() => String, { nullable: false })
    id!: string;

    @Field(() => String, { nullable: false })
    name!: string;

    @Field(() => String, { nullable: true })
    image!: string;

    @Field(() => String, { nullable: true })
    media!: string;

    @Field(() => Date, { nullable: false })
    createdAt!: Date;

    @Field(() => Date, { nullable: false })
    updatedAt!: Date;

    @Field(() => BigInt, { nullable: false })
    blockNumber!: bigint;

    @Field(() => Number, { nullable: false })
    count!: number;

    @Field(() => CheapestNFT)
    cheapestNFT!: CheapestNFT;

    @Field(() => Collection)
    collection!: Collection;


    constructor(props: Partial<TokenEntityByOwner>) {
        Object.assign(this, props);
    }
}

@ObjectType()
export class TokenEntityByOwnerQueryResult {
    @Field(() => String, { nullable: false })
    id!: string;

    @Field(() => String, { nullable: false })
    name!: string;

    @Field(() => String, { nullable: true })
    image!: string;

    @Field(() => String, { nullable: true })
    media!: string;

    @Field(() => Date, { nullable: false })
    createdAt!: Date;

    @Field(() => Date, { nullable: false })
    updatedAt!: Date;

    @Field(() => BigInt, { nullable: false })
    blockNumber!: bigint;

    @Field(() => Number, { nullable: false })
    count!: number;

    @Field(() => String, { nullable: true })
    cheapestNFTId!: string;

    @Field(() => BigInt, { nullable: true })
    cheapestNFTPrice!: bigint;

    @Field(() => String, { nullable: false })
    collectionId!: string;

    @Field(() => String, { nullable: false })
    collectionName!: string;




    constructor(props: Partial<TokenEntityByOwner>) {
        Object.assign(this, props);
    }
}

