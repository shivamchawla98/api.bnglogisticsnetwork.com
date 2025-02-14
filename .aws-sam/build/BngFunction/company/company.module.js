"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const company_service_1 = require("./company.service");
const company_resolver_1 = require("./company.resolver");
const company_entity_1 = require("./company.entity");
const profile_entity_1 = require("../PersonalProfile/entity/profile.entity");
const location_entity_1 = require("./location.entity");
const service_entity_1 = require("./service.entity");
let CompanyModule = class CompanyModule {
};
exports.CompanyModule = CompanyModule;
exports.CompanyModule = CompanyModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([company_entity_1.Company, profile_entity_1.User, location_entity_1.CompanyLocation, service_entity_1.CompanyService])],
        providers: [company_service_1.CompanyService, company_resolver_1.CompanyResolver],
        exports: [company_service_1.CompanyService, company_resolver_1.CompanyResolver],
    })
], CompanyModule);
//# sourceMappingURL=company.module.js.map