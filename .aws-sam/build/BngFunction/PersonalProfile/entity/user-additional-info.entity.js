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
exports.UserAdditionalInfo = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const profile_entity_1 = require("./profile.entity");
const contact_type_enums_1 = require("../../enums/contact-type.enums");
let UserAdditionalInfo = class UserAdditionalInfo {
};
exports.UserAdditionalInfo = UserAdditionalInfo;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserAdditionalInfo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: contact_type_enums_1.ContactType, array: true, nullable: true }),
    (0, graphql_1.Field)(() => [contact_type_enums_1.ContactType], { nullable: true }),
    __metadata("design:type", Array)
], UserAdditionalInfo.prototype, "contactType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserAdditionalInfo.prototype, "contactSpecification", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserAdditionalInfo.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserAdditionalInfo.prototype, "phoneno", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], UserAdditionalInfo.prototype, "whatsapp", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], UserAdditionalInfo.prototype, "msg", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => profile_entity_1.User, (user) => user.additionalInfo, { onDelete: 'CASCADE' }),
    (0, graphql_1.Field)(() => profile_entity_1.User),
    __metadata("design:type", profile_entity_1.User)
], UserAdditionalInfo.prototype, "user", void 0);
exports.UserAdditionalInfo = UserAdditionalInfo = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], UserAdditionalInfo);
//# sourceMappingURL=user-additional-info.entity.js.map