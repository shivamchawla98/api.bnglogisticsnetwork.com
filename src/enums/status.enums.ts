import { registerEnumType } from "@nestjs/graphql";

export enum invitationTeamMember {
    pending = 'pending',
    accepted = 'accepted',
    rejected = 'rejected'
}

registerEnumType(invitationTeamMember,{
    name: "invitationTeamMember",
    description:"Status of team member invitation"
});
