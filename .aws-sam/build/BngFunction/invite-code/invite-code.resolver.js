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
exports.InviteCodeResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const invite_code_service_1 = require("./invite-code.service");
const invite_code_entity_1 = require("./invite-code.entity");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const public_decorator_1 = require("../auth/public.decorator");
let InviteCodeResolver = class InviteCodeResolver {
    constructor(inviteCodeService) {
        this.inviteCodeService = inviteCodeService;
    }
    async validateInviteCode(code) {
        return this.inviteCodeService.validateInviteCode(code);
    }
    async generateInviteCodes(count) {
        await this.inviteCodeService.generateInviteCodes(count);
        return true;
    }
};
exports.InviteCodeResolver = InviteCodeResolver;
__decorate([
    (0, graphql_1.Query)(() => Boolean),
    (0, public_decorator_1.Public)(),
    __param(0, (0, graphql_1.Args)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InviteCodeResolver.prototype, "validateInviteCode", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('count', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InviteCodeResolver.prototype, "generateInviteCodes", null);
exports.InviteCodeResolver = InviteCodeResolver = __decorate([
    (0, graphql_1.Resolver)(() => invite_code_entity_1.InviteCode),
    __metadata("design:paramtypes", [invite_code_service_1.InviteCodeService])
], InviteCodeResolver);
//# sourceMappingURL=invite-code.resolver.js.map