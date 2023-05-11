import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class EventEntity {
  @Field(() => Date, { nullable: false })
  date!: Date;

  @Field(() => BigInt, { nullable: true, defaultValue: 0n })
  max!: bigint;

  @Field(() => Number, { nullable: true, defaultValue: 0 })
  count!: number;

  constructor(props: Partial<EventEntity>) {
    Object.assign(this, props);
  }
}

@ObjectType()
export class HistoryEntity {
  @Field(() => String)
  id!: string;

  @Field(() => Date)
  date!: Date;

  @Field(() => Number)
  count!: number;
}

@ObjectType()
export class LastEventEntity {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  issuer!: string;

  @Field(() => Date, { nullable: false })
  timestamp!: Date;

  @Field(() => String, { nullable: false })
  metadata!: string;

  @Field(() => String, { nullable: false })
  value!: string;

  @Field(() => String, { nullable: false, name: 'currentOwner' })
  current_owner!: string;

  @Field(() => String, { nullable: true })
  image!: string;

  @Field(() => String, { nullable: true, name: 'animationUrl' })
  animation_url!: string | undefined | null;

  @Field(() => String, { nullable: false, name: 'collectionId' })
  collection_id!: string;

  @Field(() => String, { nullable: true, name: 'collectionName', defaultValue: '' })
  collection_name!: string;

  constructor(props: Partial<LastEventEntity>) {
    Object.assign(this, props);
  }
}
