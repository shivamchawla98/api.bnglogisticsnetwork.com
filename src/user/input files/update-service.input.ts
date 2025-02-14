import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateServiceInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  serviceName?: string;
}
