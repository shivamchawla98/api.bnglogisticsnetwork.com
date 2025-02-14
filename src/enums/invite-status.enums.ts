import { RESOLVER_TYPE_METADATA, registerEnumType } from '@nestjs/graphql';

export enum invitationTeamMember {
   pending='pending',
   accepted = 'accepted',
   rejected = 'rejected',
   

}

registerEnumType(invitationTeamMember, {
  name: 'invitationTeamMember',
  description: 'Invite New Team Member',
});