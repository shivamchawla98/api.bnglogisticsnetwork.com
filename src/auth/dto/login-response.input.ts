import { Field, ObjectType } from '@nestjs/graphql';
import { Company } from 'src/company/entities/company.entity';

@ObjectType()
class UserInfo {
  @Field()
  id: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone?: string;

  @Field(() => Company, { nullable: true })
  company?: Company;
}

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;

  @Field(() => UserInfo)
  user: UserInfo;
}