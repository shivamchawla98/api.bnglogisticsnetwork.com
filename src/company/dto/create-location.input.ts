import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional, IsArray, IsBoolean } from 'class-validator';
import { FunctionalDepartment } from 'src/enums/functional-department.enum';

@InputType()
export class LocationContactInput {
  @Field(() => ID)
  userId: number;

  @Field()
  @IsString()
  role: string;
}

@InputType()
export class CreateCompanyLocationInput {
  @Field()
  @IsNotEmpty()
  address: string;

  @Field()
  @IsNotEmpty()
  city: string;

  @Field()
  @IsNotEmpty()
  country: string;

  @Field({ nullable: true })
  @IsOptional()
  state?: string;

  @Field({ nullable: true })
  @IsOptional()
  pincode?: string;

  @Field({ nullable: true })
  @IsOptional()
  phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  status?: string;

  @Field({ nullable: true })
  @IsOptional()
  timezone?: string;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;

  @Field(() => [FunctionalDepartment], { nullable: true })
  @IsOptional()
  @IsArray()
  departments?: FunctionalDepartment[];

  @Field(() => [LocationContactInput], { nullable: true })
  @IsOptional()
  @IsArray()
  contactRoles?: LocationContactInput[];
}
