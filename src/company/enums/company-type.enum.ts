import { registerEnumType } from '@nestjs/graphql';

export enum CompanyType {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
  PARTNERSHIP = 'PARTNERSHIP',
  PROPRIETORSHIP = 'PROPRIETORSHIP',
  LLP = 'LLP',
  LLC = 'LLC',
  CORPORATION = 'CORPORATION',
  OTHER = 'OTHER',
}

registerEnumType(CompanyType, {
  name: 'CompanyType',
  description: 'The type of company',
});
