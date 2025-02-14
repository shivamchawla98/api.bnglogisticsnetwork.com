import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

import { Company } from '../../company/entities/company.entity';

@Entity()
@ObjectType()
export class Certification {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  certificationName: string; 

  @Column({ default: 'Active' })
  @Field({ defaultValue: 'Active' })
  status: string; 

 
  @ManyToOne(() => Company, company => company.certifications, { onDelete: 'CASCADE' })
  @Field(() => Company)
  company: Company;

  
}
