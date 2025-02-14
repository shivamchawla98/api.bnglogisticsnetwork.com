import { Field, InputType } from '@nestjs/graphql';
import { ServiceType } from '../../enums/service-type.enum';
import { IsArray, IsEnum, IsNotEmpty, ValidateNested, ArrayNotEmpty } from 'class-validator';
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

  @Field({ defaultValue: false })
  isSpecialization: boolean;
}

@InputType()
export class UpdateCompanyServicesInput {
  @Field(() => [ServiceInput])
  @IsArray()
  @ArrayNotEmpty({ message: 'At least one service is required' })
  @ValidateNested({ each: true })
  @Type(() => ServiceInput)
  services: ServiceInput[];
}
