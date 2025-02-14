"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyService = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const company_entity_1 = require("./company.entity");
const service_type_enum_1 = require("../enums/service-type.enum");
let CompanyService = class CompanyService {
};
exports.CompanyService = CompanyService;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", Number)
], CompanyService.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: service_type_enum_1.ServiceType,
    }),
    (0, graphql_1.Field)(() => service_type_enum_1.ServiceType),
    __metadata("design:type", String)
], CompanyService.prototype, "serviceName", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'active' }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CompanyService.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, company => company.services),
    (0, graphql_1.Field)(() => company_entity_1.Company),
    __metadata("design:type", company_entity_1.Company)
], CompanyService.prototype, "company", void 0);
exports.CompanyService = CompanyService = __decorate([
    (0, typeorm_1.Entity)('company_services'),
    (0, graphql_1.ObjectType)('CompanyService')
], CompanyService);
//# sourceMappingURL=service.entity.js.map