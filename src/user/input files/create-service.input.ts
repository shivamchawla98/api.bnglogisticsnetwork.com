import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateServiceInput {
  @Field()
  serviceName: string; // e.g., Air Freight, Ocean Freight, Trucking, etc.
}
