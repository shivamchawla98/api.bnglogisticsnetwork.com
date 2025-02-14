// contact-type.enums.ts
import { registerEnumType } from '@nestjs/graphql';

export enum ContactType {
  FINANCIAL = 'Financial',
  OPERATION = 'Operation',
  PARTNERSHIPS = 'Partnerships',
  QUOTES = 'Quotes',
}

registerEnumType(ContactType, {
  name: 'ContactType',
  description: 'Type of contact',
});
