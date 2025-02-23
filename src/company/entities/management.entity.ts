import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.entity';
import { FunctionalDepartment } from '../../enums/functional-department.enum';

@Entity()
@ObjectType()
export class Management {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  jobRole: string;

  @Column({
    type: 'enum',
    enum: FunctionalDepartment,
    default: FunctionalDepartment.OPERATIONS,
  })
  @Field(() => FunctionalDepartment)
  department: FunctionalDepartment;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  mobile: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  whatsapp?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  linkedin?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  profilePicture?: string;

  @ManyToOne(() => Company, company => company.management, {
    onDelete: 'CASCADE',
  })
  @Field(() => Company)
  company: Company;

  @Column()
  @Field()
  companyId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  @Field()
  updatedAt: Date;
}
