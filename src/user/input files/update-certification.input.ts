import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateCertificationInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  certificationName?: string;

  @Field({ nullable: true })
  status?: string;
}
