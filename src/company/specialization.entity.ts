import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Company } from './entities/company.entity';
import { CompanyService } from './service.entity';

@Entity('company_specializations')
@ObjectType('CompanySpecialization')
export class Specialization {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ManyToOne(() => Company, company => company.specializations, { nullable: true })
  @Field(() => Company, { nullable: true })
  company?: Company;

  @ManyToOne(() => CompanyService, { nullable: true })
  @Field(() => CompanyService, { nullable: true })
  service?: CompanyService;
}
