import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, ArrayNotEmpty, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
class CertificationInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Certification name is required' })
  certificationName: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Status is required' })
  status: string;
}

@InputType()
export class UpdateCompanyCertificationsInput {
  @Field(() => [CertificationInput])
  @IsArray()
  @ArrayNotEmpty({ message: 'At least one certification is required' })
  @ValidateNested({ each: true })
  @Type(() => CertificationInput)
  certifications: CertificationInput[];
}
