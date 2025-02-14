import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from './profile.entity';
import { Subscription } from './subscription.entity';

@Entity()
@ObjectType()
export class Payment {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  paymentId: string; // Razorpay payment ID

  @Field()
  @Column()
  amount: number;

  @Field()
  @Column()
  currency: string;

  @Field()
  @Column()
  status: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  receiptUrl: string; // Receipt or Invoice URL from Razorpay

  @ManyToOne(() => User, (user) => user.payments)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Subscription, (subscription) => subscription.payments, { nullable: true })
  @Field(() => Subscription, { nullable: true })
  subscription: Subscription;
}
