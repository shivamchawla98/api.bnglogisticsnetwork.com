import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { SocialLinkInput } from './social-link.input';
import { CompanyType } from '../enums/company-type.enum';

@InputType()
export class UpdateCompanyProfileInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  companyName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  legalName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  logo?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  coverImage?: string;

  // @Field({ nullable: true })
  // @IsOptional()
  // @IsString()
  // tagline?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  website?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  size?: string;

  // @Field({ nullable: true })
  // @IsOptional()
  // @IsString()
  // founded?: string;

  // @Field({ nullable: true })
  // @IsOptional()
  // @IsString()
  // headquarters?: string;

  // @Field(() => [String], { nullable: true })
  // @IsOptional()
  // @IsArray()
  // industries?: string[];

  // @Field(() => [SocialLinkInput], { nullable: true })
  // @IsOptional()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => SocialLinkInput)
  // socialLinks?: SocialLinkInput[];

  @Field(() => CompanyType, { nullable: true })
  @IsOptional()
  @IsEnum(CompanyType)
  companyType?: CompanyType;

  // @Field({ nullable: true })
  // @IsOptional()
  // @IsString()
  // timezone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  incorporationDate?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  taxId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  companyRegistration?: string;
}
