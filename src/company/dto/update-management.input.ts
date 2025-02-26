import { InputType, Field, ID } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { FunctionalDepartment } from '../../enums/functional-department.enum';

@InputType()
export class UpdateManagementInput {

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  firstName?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  lastName?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  jobRole?: string;

  @Field(() => FunctionalDepartment, { nullable: true })
  @IsEnum(FunctionalDepartment)
  @IsOptional()
  department?: FunctionalDepartment;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  mobile?: string;

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
}
