import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class CreateCompanyInput {
  @Field()
  @IsString()
  companyName: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  legalName?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  website?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  companySize?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  coverImage?: string;
}
