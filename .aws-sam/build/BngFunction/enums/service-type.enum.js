"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceType = void 0;
const graphql_1 = require("@nestjs/graphql");
var ServiceType;
(function (ServiceType) {
    ServiceType["AIR_FREIGHT"] = "Air Freight";
    ServiceType["OCEAN_FREIGHT_FCL"] = "Ocean Freight (FCL)";
    ServiceType["OCEAN_FREIGHT_LCL"] = "Ocean Freight (LCL)";
    ServiceType["RAIL_FREIGHT"] = "Rail Freight";
    ServiceType["CONSOLIDATION"] = "Consolidation";
    ServiceType["CUSTOMS_BROKERAGE"] = "Customs Brokerage";
    ServiceType["TIME_CRITICAL"] = "Time Critical";
    ServiceType["TRUCKING"] = "Trucking";
    ServiceType["BREAK_BULK"] = "Break Bulk";
    ServiceType["PROJECT_CARGO"] = "Project Cargo";
    ServiceType["WAREHOUSING"] = "Warehousing";
    ServiceType["PHARMA_HEALTHCARE"] = "Pharma & Healthcare";
    ServiceType["AVIATION_AEROSPACE"] = "Aviation & Aerospace";
    ServiceType["RETAIL_LOGISTICS"] = "Retail Logistics";
    ServiceType["AUTOMOTIVE_SUPPLY_CHAIN"] = "Automotive Supply Chain";
    ServiceType["COLD_CHAIN_HANDLING"] = "Cold Chain Handling";
    ServiceType["DANGEROUS_GOODS"] = "Dangerous Goods - DGR";
    ServiceType["PERISHABLE_CARGO"] = "Perishable Cargo";
    ServiceType["LIVE_ANIMALS"] = "Live Animals";
    ServiceType["EXHIBITION_HANDLING"] = "Exhibition Handling";
    ServiceType["HOUSEHOLD_MOVERS"] = "Household Movers";
    ServiceType["RELOCATION"] = "Relocation";
    ServiceType["PACKING_SERVICES"] = "Packing Services";
    ServiceType["ECOMMERCE"] = "E-commerce";
    ServiceType["PACKAGING_KITTING"] = "Packaging & Kitting";
})(ServiceType || (exports.ServiceType = ServiceType = {}));
(0, graphql_1.registerEnumType)(ServiceType, {
    name: 'ServiceType',
    description: 'Available logistics and supply chain services',
});
//# sourceMappingURL=service-type.enum.js.map