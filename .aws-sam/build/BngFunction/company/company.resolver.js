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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const company_service_1 = require("./company.service");
const company_entity_1 = require("./company.entity");
const create_company_input_1 = require("./dto/create-company.input");
const profile_entity_1 = require("../PersonalProfile/entity/profile.entity");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../auth/gql-auth.guard");
const create_location_input_1 = require("./dto/create-location.input");
const location_entity_1 = require("./location.entity");
const update_company_services_input_1 = require("./dto/update-company-services.input");
const public_decorator_1 = require("../auth/public.decorator");
const graphql_2 = require("@nestjs/graphql");
const update_company_profile_input_1 = require("./dto/update-company-profile.input");
let LocationFilters = class LocationFilters {
};
__decorate([
    (0, graphql_2.Field)(() => [String]),
    __metadata("design:type", Array)
], LocationFilters.prototype, "cities", void 0);
__decorate([
    (0, graphql_2.Field)(() => [String]),
    __metadata("design:type", Array)
], LocationFilters.prototype, "countries", void 0);
LocationFilters = __decorate([
    (0, graphql_2.ObjectType)()
], LocationFilters);
let CompanyResolver = class CompanyResolver {
    constructor(companyService) {
        this.companyService = companyService;
    }
    async createCompany(createCompanyInput, userId) {
        return this.companyService.createCompany(createCompanyInput, userId);
    }
    async getCompanyById(id) {
        return this.companyService.getCompanyById(id);
    }
    async getAllCompanies() {
        return this.companyService.getAllCompanies();
    }
    async searchCompanies(query, city, country) {
        return this.companyService.searchCompanies(query, { city, country });
    }
    async getLocationFilters() {
        return this.companyService.getUniqueLocations();
    }
    async assignUserToCompany(userId, companyId) {
        return this.companyService.assignUserToCompany(userId, companyId);
    }
    async createCompanyLocation(companyId, input) {
        return this.companyService.createLocation(companyId, input);
    }
    async updateCompanyServices(companyId, input) {
        console.log("---- abcd companyId ----", companyId);
        console.log("---- abcd input ----", input);
        return this.companyService.updateCompanyServices(companyId, input);
    }
    async updateCompanyProfile(companyId, input) {
        try {
            const updatedCompany = await this.companyService.updateCompanyProfile(companyId, input);
            return updatedCompany;
        }
        catch (error) {
            throw new Error(`Failed to update company profile: ${error.message}`);
        }
    }
};
exports.CompanyResolver = CompanyResolver;
__decorate([
    (0, graphql_1.Mutation)(() => company_entity_1.Company),
    (0, public_decorator_1.Public)(),
    __param(0, (0, graphql_1.Args)('createCompanyInput')),
    __param(1, (0, graphql_1.Args)('userId', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_company_input_1.CreateCompanyInput, String]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "createCompany", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, graphql_1.Query)(() => company_entity_1.Company),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "getCompanyById", null);
__decorate([
    (0, graphql_1.Query)(() => [company_entity_1.Company]),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "getAllCompanies", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, graphql_1.Query)(() => [company_entity_1.Company]),
    __param(0, (0, graphql_1.Args)('query', { type: () => String, nullable: true })),
    __param(1, (0, graphql_1.Args)('city', { type: () => String, nullable: true })),
    __param(2, (0, graphql_1.Args)('country', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "searchCompanies", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, graphql_1.Query)(() => LocationFilters),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "getLocationFilters", null);
__decorate([
    (0, graphql_1.Mutation)(() => profile_entity_1.User),
    (0, public_decorator_1.Public)(),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('companyId', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "assignUserToCompany", null);
__decorate([
    (0, graphql_1.Mutation)(() => location_entity_1.CompanyLocation),
    (0, public_decorator_1.Public)(),
    __param(0, (0, graphql_1.Args)('companyId', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_location_input_1.CreateCompanyLocationInput]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "createCompanyLocation", null);
__decorate([
    (0, graphql_1.Mutation)(() => company_entity_1.Company),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)('companyId', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_company_services_input_1.UpdateCompanyServicesInput]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "updateCompanyServices", null);
__decorate([
    (0, graphql_1.Mutation)(() => company_entity_1.Company),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)('companyid', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_company_profile_input_1.UpdateCompanyProfileInput]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "updateCompanyProfile", null);
exports.CompanyResolver = CompanyResolver = __decorate([
    (0, graphql_1.Resolver)(() => company_entity_1.Company),
    __metadata("design:paramtypes", [company_service_1.CompanyService])
], CompanyResolver);
//# sourceMappingURL=company.resolver.js.map