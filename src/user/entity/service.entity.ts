import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Company } from '../../company/entities/company.entity';

@Entity()
@ObjectType()
export class Service {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  serviceName: string; 
  
  @ManyToOne(() => Company, company => company.services, { onDelete: 'CASCADE' })
  @Field(() => Company)
  company: Company;
}
