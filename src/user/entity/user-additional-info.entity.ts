import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from "./profile.entity"
import { ContactType } from '../../enums/contact-type.enums';

@Entity()
@ObjectType()
export class UserAdditionalInfo {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ContactType, array: true, nullable: true })
  @Field(() => [ContactType], { nullable: true })
  contactType: ContactType[] | null;

  @Column({ nullable: true })
  @Field({ nullable: true })
  contactSpecification: string | null;

  @Column({ nullable: true })
  @Field({ nullable: true })
  email: string | null;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phoneno: string | null;

  @Column({ default: false })
  @Field({ nullable: true })
  whatsapp: boolean;

  @Column({ default: false })
  @Field({ nullable: true })
  msg: boolean;

  // @OneToOne(() => User, (user) => user.additionalInfo, { onDelete: 'CASCADE' })
  // @Field(() => User)
  // user: User;
}
