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
exports.Certification = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const company_entity_1 = require("../../company/company.entity");
let Certification = class Certification {
};
exports.Certification = Certification;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Certification.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Certification.prototype, "certificationName", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Active' }),
    (0, graphql_1.Field)({ defaultValue: 'Active' }),
    __metadata("design:type", String)
], Certification.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, company => company.certifications, { onDelete: 'CASCADE' }),
    (0, graphql_1.Field)(() => company_entity_1.Company),
    __metadata("design:type", company_entity_1.Company)
], Certification.prototype, "company", void 0);
exports.Certification = Certification = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Certification);
//# sourceMappingURL=certification.entity.js.map