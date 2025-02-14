import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from './profile.entity';
import { Payment } from './payment.entity';

@Entity()
@ObjectType()
export class Subscription {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  subscriptionId: string; // Razorpay Subscription ID

  @Field()
  @Column()
  planId: string; // Razorpay Plan ID

  @Field()
  @Column()
  status: string; // Active, Canceled, etc.

  @Field()
  @Column()
  startDate: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  endDate: Date;

  @OneToOne(() => User, (user) => user.subscription)
  @Field(() => User)
  user: User;

  @OneToMany(() => Payment, (payment) => payment.subscription)
  @Field(() => [Payment], { nullable: true })
  payments: Payment[];
}
