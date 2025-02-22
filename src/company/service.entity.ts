import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Company } from './entities/company.entity';
import { ServiceType } from '../enums/service-type.enum';

@Entity('company_services')
@ObjectType('CompanyService')
export class CompanyService {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({
    type: 'enum',
    enum: ServiceType,
  })
  @Field(() => ServiceType)
  serviceName: ServiceType;

  @Column({ default: 'active' })
  @Field()
  status: string;

  @ManyToOne(() => Company, company => company.services)
  @Field(() => Company)
  company: Company;
}
