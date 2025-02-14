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
exports.CreateUserAdditionalInfoInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const contact_type_enums_1 = require("../../enums/contact-type.enums");
let CreateUserAdditionalInfoInput = class CreateUserAdditionalInfoInput {
};
exports.CreateUserAdditionalInfoInput = CreateUserAdditionalInfoInput;
__decorate([
    (0, graphql_1.Field)(() => [contact_type_enums_1.ContactType], { nullable: true }),
    __metadata("design:type", Array)
], CreateUserAdditionalInfoInput.prototype, "contactType", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateUserAdditionalInfoInput.prototype, "contactSpecification", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateUserAdditionalInfoInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateUserAdditionalInfoInput.prototype, "phoneno", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: false }),
    __metadata("design:type", Boolean)
], CreateUserAdditionalInfoInput.prototype, "whatsapp", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: false }),
    __metadata("design:type", Boolean)
], CreateUserAdditionalInfoInput.prototype, "msg", void 0);
exports.CreateUserAdditionalInfoInput = CreateUserAdditionalInfoInput = __decorate([
    (0, graphql_1.InputType)()
], CreateUserAdditionalInfoInput);
//# sourceMappingURL=user-additional-info.input.js.map