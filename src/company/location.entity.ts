import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { Company } from './entities/company.entity';
import { FunctionalDepartment } from 'src/enums/functional-department.enum';
import { User } from '../user/entity/profile.entity';

@ObjectType()
export class LocationContact {
  @Field(() => ID)
  userId: number;

  @Field()
  role: string;
}

@Entity('company_locations')
@ObjectType('CompanyLocation')
export class CompanyLocation {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  city: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  country: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  address: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  pincode: string;

  @Column({ nullable: true, default: 'active' })
  @Field({ nullable: true })
  status: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'location_contacts',
    joinColumn: { name: 'location_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' }
  })
  @Field(() => [User], { nullable: true })
  contactUsers: User[];

  @Column('simple-json', { nullable: true })
  @Field(() => [LocationContact], { nullable: true })
  contactRoles: LocationContact[];

  @ManyToOne(() => Company, company => company.locations)
  @Field(() => Company)
  company: Company;

  @Field()
  @Column({ nullable: true })
  timezone: string;

  @Field({nullable: true})
  @Column({ nullable: true })
  phone: string;

  @Field(() => [FunctionalDepartment], { nullable: true })
  @Column('simple-array', { nullable: true })
  departments: FunctionalDepartment[];

  @Column({ default: false })
  @Field()
  isPrimary: boolean;
}
