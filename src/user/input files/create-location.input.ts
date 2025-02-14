import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateLocationInput {
  @Field()
  city: string;

  @Field()
  country: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true, defaultValue: 'Active' })
  status?: string;

  @Field({ nullable: true })
  contacts?: string; // Can be a JSON string to store contacts like quotes, partnerships, etc.
}
