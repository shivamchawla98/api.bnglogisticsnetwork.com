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
exports.LoginResponse = void 0;
const graphql_1 = require("@nestjs/graphql");
const company_entity_1 = require("../../company/company.entity");
let UserInfo = class UserInfo {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], UserInfo.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserInfo.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserInfo.prototype, "phone", void 0);
__decorate([
    (0, graphql_1.Field)(() => company_entity_1.Company, { nullable: true }),
    __metadata("design:type", company_entity_1.Company)
], UserInfo.prototype, "company", void 0);
UserInfo = __decorate([
    (0, graphql_1.ObjectType)()
], UserInfo);
let LoginResponse = class LoginResponse {
};
exports.LoginResponse = LoginResponse;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LoginResponse.prototype, "access_token", void 0);
__decorate([
    (0, graphql_1.Field)(() => UserInfo),
    __metadata("design:type", UserInfo)
], LoginResponse.prototype, "user", void 0);
exports.LoginResponse = LoginResponse = __decorate([
    (0, graphql_1.ObjectType)()
], LoginResponse);
//# sourceMappingURL=login-response.input.js.map