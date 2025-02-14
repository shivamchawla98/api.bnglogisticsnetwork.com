import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Invitation } from './teaminvite.entity';
import { User } from 'src/user/entity/profile.entity';

@Entity()
@ObjectType()
export class Team {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  name: string;  // Team name


  @OneToMany(() => Invitation, invitation => invitation.team)
  @Field(() => [Invitation], { nullable: true })
  invitations: Invitation[];
}
