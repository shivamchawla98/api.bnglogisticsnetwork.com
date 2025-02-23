import { RESOLVER_TYPE_METADATA, registerEnumType } from '@nestjs/graphql';

export enum JobRole {
   // Management Roles
   Founder = "Founder",
   Managing_Director = "Managing Director",
   Management = "Management",
   Director = "Director",
   President = "President",
   Vice_President = "Vice President",

   // Leadership Roles
   CEO = "Chief Executive Officer",
   COO = "Chief Operations Officer",
   CTO = "Chief Technology Officer",
   General_Manager = "General Manager",
   Branch_Manager = "Branch Manager",
   Overseas_Manager = "Overseas Manager",
   Regional_Manager = "Regional Manager",
   Logistics_Manager = "Logistics Manager",
   Freight_Manager = "Freight Manager",
   Fleet_Manager = "Fleet Manager",
   Project_Manager = "Project Manager",

   // Operations Roles
   Overseas_Coordinator = "Overseas Coordinator",
   Ocean_Freight_Specialist = "Ocean Freight Specialist",
   Air_Freight_Specialist = "Air Freight Specialist",
   Road_Freight_Specialist = "Road Freight Specialist",
   Warehouse_Specialist = "Warehouse Specialist",
   Dispatch_Coordinator = "Dispatch Coordinator",
   Regulatory_Affairs_Specialist = "Regulatory Affairs Specialist",
   DGR_Specialist = "Dangerous Goods Specialist",
   Consolidation_Specialist = "Consolidation Specialist",
   Shipping_Line_Coordinator = "Shipping Line Coordinator",
   Chartering_Executive = "Chartering Executive",

   // Sales and Marketing Roles
   Sales_Business_Dev_Manager = "Sales / Business Development Manager",
   Sales_Executive = "Sales Executive",
   Client_Relationship_Manager = "Client Relationship Manager",
   Marketing_Executive = "Marketing Executive",
   Sales_Support_Coordinator = "Sales Support Coordinator",

   // Customer Service and Support Roles
   Customer_Service_Representative = "Customer Service Representative",
   Customer_Success_Specialist = "Customer Success Specialist",
   Client_Support_Specialist = "Client Support Specialist",
   Service_Delivery_Manager = "Service Delivery Manager",
   Client_Solutions_Specialist = "Client Solutions Specialist",

   // Finance and Administrative Roles
   Finance_Manager = "Finance Manager",
   Accounting_Executive = "Accounting Executive",
   Admin_Executive = "Admin Executive",
   Credit_Controller = "Credit Controller"

}

registerEnumType(JobRole, {
  name: 'JobRole',
  description: 'Designation of the job profile',
});