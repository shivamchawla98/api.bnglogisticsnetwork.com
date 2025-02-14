import { InputType, Field } from '@nestjs/graphql';
import { JobRole } from 'src/enums/job-profile.enums';
import { location } from 'src/enums/location.enums';
@InputType()
export class InviteMemberInput {
  @Field({nullable:true})
  firstName: string;

  @Field({nullable:true})
  lastName: string;

  @Field({nullable:true})
  email: string;

  @Field(() => JobRole,{nullable:true})
  job: JobRole;
  @Field(() => [location],{nullable:true})
  location: location[];
  @Field({nullable:true})
  canMangaTeam:boolean
}
