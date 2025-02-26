import { Entity, Column, PrimaryGeneratedColumn,OneToOne,OneToMany,ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { RESOLVER_TYPE_METADATA } from '@nestjs/graphql';
import { JobRole } from '../../enums/job-profile.enums';
import { UserAdditionalInfo } from './user-additional-info.entity';
import { Payment } from './payment.entity';
import { Subscription } from './subscription.entity';
import { Invoice } from './invoice.entity';
import { Company } from '../../company/entities/company.entity';
import { Service } from './service.entity';
import { invitationTeamMember } from '../../enums/invite-status.enums';

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastName: string;

  @Column({ nullable: false })
  @Field()
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  whatsapp: string;

  @Column({ nullable: false })
  @Field()
  password: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  confirmPassword: string;
  @Column({type:'enum',enum:JobRole,nullable:true})
  @Field(()=>JobRole,{nullable:true})
   JobRole:JobRole | null;

   @Column({ nullable: true })
   @Field({ nullable: true })
    LinkedinProfile: string;
    
   @Column({ nullable: true })
   @Field({ nullable: true })
    imageurl: string;
    // @OneToOne(() => UserAdditionalInfo, (additionalInfo) => additionalInfo.user, { cascade: true, onDelete: 'CASCADE' })
    // @JoinColumn()
    // @Field(() => UserAdditionalInfo, { nullable: true })
    // additionalInfo: UserAdditionalInfo | null;

  @OneToMany(() => Company, company => company.owner)
  @Field(() => [Company], { nullable: true })
  companies: Company[];

  @ManyToOne(() => Company, company => company.users, { onDelete: 'CASCADE' })
  @Field(() => Company, { nullable: true })
  company: Company;

  

  @OneToMany(() => Payment, (payment) => payment.user)
  @Field(() => [Payment], { nullable: true })
  payments: Payment[];

  @OneToOne(() => Subscription, (subscription) => subscription.user)
  @Field(() => Subscription, { nullable: true })
  subscription: Subscription;

  @Column({ nullable: true })
  @Field({ nullable: true })
  razorpayCustomerId: string; // Razorpay customer ID

  @Column({ nullable: true })
  @Field({ nullable: true })
  paymentMethodToken: string; // Token for the saved payment method

  @OneToMany(() => Invoice, (invoice) => invoice.user)
  @Field(() => [Invoice], { nullable: true })
  invoices: Invoice[];

  /* @Column({type:'enum',enum:invitationTeamMember,nullable:true})
  @Field(()=>invitationTeamMember,{nullable:true})
  status: invitationTeamMember; */

  @Column({nullable:true})
  @Field({nullable:true})
  otp:string


  

}