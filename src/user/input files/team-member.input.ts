import { InputType, Field } from "@nestjs/graphql";
import { JobRole } from "src/enums/job-profile.enums";
import { location } from "src/enums/location.enums";

@InputType()
export class InviteTeamMemberInput {
    @Field()
    email: string;

    @Field(() => JobRole)
    JobRole: JobRole;

    @Field(() => [location], { nullable: true })
    location: location[];

    @Field({ nullable: true })
    firstName: string;

    @Field({ nullable: true })
    lastName: string;

    @Field({ nullable: true })
    canManageTeam: boolean;

    @Field()
    password: string;

    @Field()
    confirmPassword: string;
}