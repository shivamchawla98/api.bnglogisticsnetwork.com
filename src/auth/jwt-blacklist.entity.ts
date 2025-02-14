import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class JwtBlacklist {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  token: string;

  @Field()
  @CreateDateColumn()
  blacklistedAt: Date;

  @Field()
  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;
}
