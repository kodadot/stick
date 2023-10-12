import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class CountEntity {
  @Field(() => Number, { nullable: false, name: 'totalCount' })
  total!: number;

  constructor(totalCount: number) {
    this.total = totalCount;
  }
}


@ObjectType()
export class CountEntityQueryResult {
    @Field(() => Number, { nullable: false })
    total_count!: number;


    constructor(props: Partial<CountEntityQueryResult>) {
        Object.assign(this, props);
    }
}
