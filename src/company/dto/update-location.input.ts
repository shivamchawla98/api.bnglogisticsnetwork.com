import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';
import { FunctionalDepartment } from 'src/enums/functional-department.enum';

@InputType()
export class UpdateCompanyLocationInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  city?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  address?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  country?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  status?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  contacts?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  phone?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  timezone?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  pincode?: string;

  @Field(() => [FunctionalDepartment], { nullable: true })
  @IsOptional()
  departments?: FunctionalDepartment[];

  @Field({ nullable: true })
  @IsOptional()
  isPrimary?: boolean;
}
