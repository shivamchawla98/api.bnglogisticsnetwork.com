import { InputType, Field } from '@nestjs/graphql';
import { JobRole } from 'src/enums/job-profile.enums';
import { Timezone } from 'src/enums/timezone.enums';
import { UserStatus } from 'src/enums/user-status.enums';
import { CreateUserAdditionalInfoInput } from './user-additional-info.input';
import { IsString, IsEmail, MinLength, IsOptional, IsEnum } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  firstName: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  phone: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;
  
  @Field(() => JobRole, { nullable: true })
  @IsEnum(JobRole)
  @IsOptional()
  jobRole: JobRole;

  @Field(() => Timezone, { nullable: true })
  @IsEnum(Timezone)
  @IsOptional()
  timezone?: Timezone;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  LinkedinProfile: string;

  @Field(() => UserStatus, { defaultValue: UserStatus.ACTIVE })
  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;

  @Field(() => CreateUserAdditionalInfoInput, { nullable: true })
  @IsOptional()
  additionalInfo?: CreateUserAdditionalInfoInput;
}
