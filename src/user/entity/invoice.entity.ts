import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from './profile.entity';

@Entity()
@ObjectType()
export class Invoice {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  invoiceId: string; 

  @Field()
  @Column()
  amount: number;

  @Field()
  @Column()
  status: string;

  @Field()
  @Column()
  invoiceUrl: string;

  @ManyToOne(() => User, (user) => user.invoices)
  @Field(() => User)
  user: User;
}
