import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateLocationInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  contacts?: string;
}
