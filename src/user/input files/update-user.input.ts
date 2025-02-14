import { InputType, Field, ID } from '@nestjs/graphql';
import { JobRole } from 'src/enums/job-profile.enums';
import { CreateUserAdditionalInfoInput } from './user-additional-info.input';
import { IsString, IsEmail, MinLength, IsOptional, IsEnum } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  firstName?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  lastName?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  phone?: string;

  @Field({ nullable: true })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @Field({ nullable: true })
  @IsString()
  @MinLength(6)
  @IsOptional()
  confirmPassword?: string;

  @Field(() => JobRole, { nullable: true })
  @IsEnum(JobRole)
  @IsOptional()
  JobRole?: JobRole;

  @Field(() => CreateUserAdditionalInfoInput, { nullable: true })
  @IsOptional()
  additionalInfo?: CreateUserAdditionalInfoInput;
}
