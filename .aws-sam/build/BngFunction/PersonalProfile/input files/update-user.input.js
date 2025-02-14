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
exports.UpdateUserInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const job_profile_enums_1 = require("../../enums/job-profile.enums");
const timezone_enums_1 = require("../../enums/timezone.enums");
const user_additional_info_input_1 = require("./user-additional-info.input");
let UpdateUserInput = class UpdateUserInput {
};
exports.UpdateUserInput = UpdateUserInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", Number)
], UpdateUserInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "phone", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "confirmPassword", void 0);
__decorate([
    (0, graphql_1.Field)(() => job_profile_enums_1.JobRole, { nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "JobRole", void 0);
__decorate([
    (0, graphql_1.Field)(() => timezone_enums_1.Timezone, { nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "timezone", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_additional_info_input_1.CreateUserAdditionalInfoInput, { nullable: true }),
    __metadata("design:type", user_additional_info_input_1.CreateUserAdditionalInfoInput)
], UpdateUserInput.prototype, "additionalInfo", void 0);
exports.UpdateUserInput = UpdateUserInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateUserInput);
//# sourceMappingURL=update-user.input.js.map