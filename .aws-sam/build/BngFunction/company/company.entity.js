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
exports.Company = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const profile_entity_1 = require("../PersonalProfile/entity/profile.entity");
const location_entity_1 = require("./location.entity");
const service_entity_1 = require("./service.entity");
const certification_entity_1 = require("../PersonalProfile/entity/certification.entity");
let Company = class Company {
};
exports.Company = Company;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", Number)
], Company.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "companyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "legalName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "coverImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "tagline", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "founded", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "headquarters", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], Company.prototype, "industries", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-json', { nullable: true }),
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], Company.prototype, "socialLinks", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => profile_entity_1.User, user => user.companies),
    (0, graphql_1.Field)(() => profile_entity_1.User),
    __metadata("design:type", profile_entity_1.User)
], Company.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => profile_entity_1.User, user => user.company),
    (0, graphql_1.Field)(() => [profile_entity_1.User], { nullable: true }),
    __metadata("design:type", Array)
], Company.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => location_entity_1.CompanyLocation, location => location.company),
    (0, graphql_1.Field)(() => [location_entity_1.CompanyLocation]),
    __metadata("design:type", Array)
], Company.prototype, "locations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_entity_1.CompanyService, service => service.company),
    (0, graphql_1.Field)(() => [service_entity_1.CompanyService]),
    __metadata("design:type", Array)
], Company.prototype, "services", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => certification_entity_1.Certification, certification => certification.company),
    (0, graphql_1.Field)(() => [certification_entity_1.Certification]),
    __metadata("design:type", Array)
], Company.prototype, "certifications", void 0);
exports.Company = Company = __decorate([
    (0, typeorm_1.Entity)('company'),
    (0, graphql_1.ObjectType)('Company')
], Company);
//# sourceMappingURL=company.entity.js.map