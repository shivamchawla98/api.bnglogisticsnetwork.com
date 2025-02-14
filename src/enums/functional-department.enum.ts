import { registerEnumType } from '@nestjs/graphql';

export enum FunctionalDepartment {
  OPERATIONS = 'Operations Department',
  SALES = 'Sales & Business Development',
  CUSTOMER_SERVICE = 'Customer Service',
  CUSTOMS = 'Customs Clearance & Compliance',
  FINANCE = 'Finance & Accounting',
  IT = 'IT & Digital Solutions',
  PROCUREMENT = 'Procurement & Carrier Relations',
  WAREHOUSING = 'Warehousing & Distribution',
  MARKETING = 'Marketing & Branding',
  HR = 'Human Resources & Administration'
}

registerEnumType(FunctionalDepartment, {
  name: 'FunctionalDepartment',
  description: 'Available functional departments',
});
