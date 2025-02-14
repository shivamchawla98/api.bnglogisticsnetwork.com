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
exports.Invitation = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const job_profile_enums_1 = require("../../enums/job-profile.enums");
const team_entity_1 = require("./team.entity");
let Invitation = class Invitation {
};
exports.Invitation = Invitation;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Invitation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Invitation.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Invitation.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Invitation.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: job_profile_enums_1.JobRole, nullable: true }),
    (0, graphql_1.Field)(() => job_profile_enums_1.JobRole, { nullable: true }),
    __metadata("design:type", String)
], Invitation.prototype, "jobRole", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Invitation.prototype, "contactRole", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], Invitation.prototype, "accepted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => team_entity_1.Team, (team) => team.invitations, { onDelete: 'CASCADE' }),
    (0, graphql_1.Field)(() => team_entity_1.Team),
    __metadata("design:type", team_entity_1.Team)
], Invitation.prototype, "team", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Invitation.prototype, "token", void 0);
exports.Invitation = Invitation = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Invitation);
//# sourceMappingURL=teaminvite.entity.js.map