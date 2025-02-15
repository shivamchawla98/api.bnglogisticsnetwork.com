import { InputType, Field } from "@nestjs/graphql";
import { JobRole } from "src/enums/job-profile.enums";
import { location } from "src/enums/location.enums";
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class InviteTeamMemberInput {
    @Field()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Field(() => JobRole)
    @IsNotEmpty()
    JobRole: JobRole;

    @Field(() => [location], { nullable: true })
    location?: location[];

    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;

    @Field({ nullable: true })
    canManageTeam?: boolean;

    @Field()
    @MinLength(8)
    @IsNotEmpty()
    password: string;

    @Field()
    @MinLength(8)
    @IsNotEmpty()
    confirmPassword: string;
}