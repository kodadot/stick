import { ObjectType, Field } from 'type-graphql';




@ObjectType()
export class GroupedNFTEntity {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: true })
  name?: string | null;

  @Field(() => String, { nullable: true })
  metadata?: string | null;

  @Field(() => String, { nullable: true })
  image?: string | null;

  @Field(() => BigInt, { nullable: true, defaultValue: 0n, name: 'price' })
  price?: bigint | null;

  @Field(() => Number, { nullable: true, defaultValue: 1 })
  copies?: number | null;
}

