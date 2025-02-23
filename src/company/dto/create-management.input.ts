import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsString, IsUrl, IsOptional } from 'class-validator';
import { FunctionalDepartment } from '../../enums/functional-department.enum';

@InputType()
export class CreateManagementInput {
  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field()
  @IsString()
  jobRole: string;

  @Field(() => FunctionalDepartment)
  @IsEnum(FunctionalDepartment)
  department: FunctionalDepartment;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  mobile: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  whatsapp?: string;

  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  linkedin?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  profilePicture?: string;

  @Field()
  @IsString()
  companyId: string;
}
