import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

import { Company } from '../../company/entities/company.entity';
import { Timezone } from '../../enums/timezone.enums';

@Entity()
@ObjectType()
export class Location {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  city: string;

  @Column()
  @Field()
  country: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  address: string;

  @Column({ type: 'enum', enum: Timezone, nullable: true })
  @Field(() => Timezone, { nullable: true })
  timezone: Timezone;

  @Column({ default: 'Active' })
  @Field({ defaultValue: 'Active' })
  status: string; // e.g., Active, Inactive

  @Column({ nullable: true })
  @Field({ nullable: true })
  contacts: string; // e.g., JSON format to store types like quotes, partnerships, financial

  // Many locations belong to one company
  @ManyToOne(() => Company, company => company.locations, { onDelete: 'CASCADE' })
  @Field(() => Company)
  company: Company;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  pincode: string;
}
