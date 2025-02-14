import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
@Entity()
@ObjectType()
export class Plan {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  planId: string; 

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  amount: number; 

  @Column()
  @Field()
  currency: string;

  @Column()
  @Field()
  period: string; 

  @Column()
  @Field()
  interval: number; 
}
