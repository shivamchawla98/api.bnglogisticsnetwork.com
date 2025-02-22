import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../user/entity/profile.entity';
import { CompanyLocation } from '../location.entity';
import { CompanyService } from '../service.entity';
import { Service } from '../../user/entity/service.entity';
import { Certification } from '../../user/entity/certification.entity';
import { CompanyType } from '../enums/company-type.enum';
import { Management } from './management.entity';
import { Specialization } from '../specialization.entity';

@Entity('company')
@ObjectType('Company')
export class Company {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({nullable:true})
  @Field({nullable:true})
  companyName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  legalName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  logo?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  coverImage?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  tagline?: string;

  @Column('text', { nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  website?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  size?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  founded?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  headquarters?: string;

  @Column('simple-array', { nullable: true })
  @Field(() => [String], { nullable: true })
  industries?: string[];

  @Column('simple-json', { nullable: true })
  @Field(() => [String], { nullable: true })
  socialLinks?: { platform: string; url: string; }[];

  @Column({ type: 'enum', enum: CompanyType, nullable: true })
  @Field(() => CompanyType, { nullable: true })
  companyType?: CompanyType;

  // @Column({ nullable: true })
  // @Field({ nullable: true })
  // timezone?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  incorporationDate?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  taxId?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  companyRegistration?: string;

  @ManyToOne(() => User, user => user.companies)
  @Field(() => User)
  owner: User;

  @OneToMany(() => User, user => user.company)
  @Field(() => [User], { nullable: true })
  users: User[];

  @OneToMany(() => CompanyLocation, location => location.company)
  @Field(() => [CompanyLocation])
  locations: CompanyLocation[];

  @OneToMany(() => CompanyService, service => service.company)
  @Field(() => [CompanyService])
  services: CompanyService[];

  @OneToMany(() => Specialization, specialization => specialization.company, { nullable: true })
  @Field(() => [Specialization], { nullable: true })
  specializations?: Specialization[];

  @OneToMany(() => Certification, certification => certification.company)
  @Field(() => [Certification])
  certifications: Certification[];

  @OneToMany(() => Management, management => management.company)
  @Field(() => [Management], { nullable: true })
  management?: Management[];
}
