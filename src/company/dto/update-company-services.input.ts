import { Field, InputType } from '@nestjs/graphql';
import { ServiceType } from '../../enums/service-type.enum';
import { IsArray, IsEnum, IsNotEmpty, ValidateNested, ArrayNotEmpty, ArrayMaxSize } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
class ServiceInput {
  @Field(() => ServiceType)
  @IsEnum(ServiceType)
  @IsNotEmpty({ message: 'Service name is required' })
  serviceName: ServiceType;

  @Field()
  @IsNotEmpty({ message: 'Status is required' })
  status: string;
}

@InputType()
export class UpdateCompanyServicesInput {
  @Field(() => [ServiceInput])
  @IsArray()
  @ArrayNotEmpty({ message: 'At least one service is required' })
  @ValidateNested({ each: true })
  @Type(() => ServiceInput)
  services: ServiceInput[];

  @Field(() => [ServiceType], { nullable: true })
  @IsArray()
  @ArrayMaxSize(3, { message: 'Maximum 3 specializations are allowed' })
  @IsEnum(ServiceType, { each: true })
  specializations?: ServiceType[];
}
