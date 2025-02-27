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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const job_profile_enums_1 = require("../../enums/job-profile.enums");
const timezone_enums_1 = require("../../enums/timezone.enums");
const user_additional_info_entity_1 = require("./user-additional-info.entity");
const payment_entity_1 = require("./payment.entity");
const subscription_entity_1 = require("./subscription.entity");
const invoice_entity_1 = require("./invoice.entity");
const company_entity_1 = require("../../company/company.entity");
let User = class User {
};
exports.User = User;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "confirmPassword", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: job_profile_enums_1.JobRole, nullable: true }),
    (0, graphql_1.Field)(() => job_profile_enums_1.JobRole, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "JobRole", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: timezone_enums_1.Timezone, nullable: true }),
    (0, graphql_1.Field)(() => timezone_enums_1.Timezone, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "timezone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "LinkedinProfile", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "imageurl", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_additional_info_entity_1.UserAdditionalInfo, (additionalInfo) => additionalInfo.user, { cascade: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    (0, graphql_1.Field)(() => user_additional_info_entity_1.UserAdditionalInfo, { nullable: true }),
    __metadata("design:type", user_additional_info_entity_1.UserAdditionalInfo)
], User.prototype, "additionalInfo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => company_entity_1.Company, company => company.owner),
    (0, graphql_1.Field)(() => [company_entity_1.Company], { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "companies", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, company => company.users, { onDelete: 'CASCADE' }),
    (0, graphql_1.Field)(() => company_entity_1.Company, { nullable: true }),
    __metadata("design:type", company_entity_1.Company)
], User.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payment_entity_1.Payment, (payment) => payment.user),
    (0, graphql_1.Field)(() => [payment_entity_1.Payment], { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "payments", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => subscription_entity_1.Subscription, (subscription) => subscription.user),
    (0, graphql_1.Field)(() => subscription_entity_1.Subscription, { nullable: true }),
    __metadata("design:type", subscription_entity_1.Subscription)
], User.prototype, "subscription", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "razorpayCustomerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "paymentMethodToken", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => invoice_entity_1.Invoice, (invoice) => invoice.user),
    (0, graphql_1.Field)(() => [invoice_entity_1.Invoice], { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "invoices", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "otp", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], User);
//# sourceMappingURL=profile.entity.js.map