import { registerEnumType } from '@nestjs/graphql';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
  PENDING = 'PENDING'
}

registerEnumType(UserStatus, {
  name: 'UserStatus',
  description: 'User status enum',
});
