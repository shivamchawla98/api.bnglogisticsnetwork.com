import { Entity, Column, PrimaryGeneratedColumn, ManyToOne ,JoinColumn} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { JobRole } from '../../enums/job-profile.enums';
import { User } from './profile.entity';
import { invitationTeamMember } from 'src/enums/invite-status.enums';
import { location } from 'src/enums/location.enums';
import { Team } from './team.entity';
@Entity()
@ObjectType()
export class Invitation {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastName: string;

  @Column({type:'enum',enum:JobRole,nullable:true})
  @Field(()=>JobRole,{nullable:true})
  jobRole: JobRole | null;

  @Column({ nullable: true })
  @Field({ nullable: true })
  contactRole: string;

  @Column({ default: false })
  @Field(() => Boolean)
  accepted: boolean; // Invitation status (pending or accepted)

  

  @ManyToOne(() => Team, (team) => team.invitations, { onDelete: 'CASCADE' })
  @Field(() => Team)
  team: Team;

  

  @Column({ unique: true })
  @Field()
  token: string;  // Token for accepting the invitation
}
