import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCertificationInput {
  @Field()
  certificationName: string; // e.g., IATA, AEO, etc.

  @Field({ nullable: true, defaultValue: 'Active' })
  status?: string; // e.g., Active, Empty
}
