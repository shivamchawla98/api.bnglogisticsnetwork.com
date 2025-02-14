import { registerEnumType } from '@nestjs/graphql';

export enum ServiceType {
  AIR_FREIGHT = 'Air Freight',
  OCEAN_FREIGHT_FCL = 'Ocean Freight (FCL)',
  OCEAN_FREIGHT_LCL = 'Ocean Freight (LCL)',
  RAIL_FREIGHT = 'Rail Freight',
  CONSOLIDATION = 'Consolidation',
  CUSTOMS_BROKERAGE = 'Customs Brokerage',
  TIME_CRITICAL = 'Time Critical',
  TRUCKING = 'Trucking',
  BREAK_BULK = 'Break Bulk',
  PROJECT_CARGO = 'Project Cargo',
  WAREHOUSING = 'Warehousing',
  PHARMA_HEALTHCARE = 'Pharma & Healthcare',
  AVIATION_AEROSPACE = 'Aviation & Aerospace',
  RETAIL_LOGISTICS = 'Retail Logistics',
  AUTOMOTIVE_SUPPLY_CHAIN = 'Automotive Supply Chain',
  COLD_CHAIN_HANDLING = 'Cold Chain Handling',
  DANGEROUS_GOODS = 'Dangerous Goods - DGR',
  PERISHABLE_CARGO = 'Perishable Cargo',
  LIVE_ANIMALS = 'Live Animals',
  EXHIBITION_HANDLING = 'Exhibition Handling',
  HOUSEHOLD_MOVERS = 'Household Movers',
  RELOCATION = 'Relocation',
  PACKING_SERVICES = 'Packing Services',
  ECOMMERCE = 'E-commerce',
  PACKAGING_KITTING = 'Packaging & Kitting'
}

registerEnumType(ServiceType, {
  name: 'ServiceType',
  description: 'Available logistics and supply chain services',
});
