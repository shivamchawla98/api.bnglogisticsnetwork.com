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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_service_1 = require("../services/user.service");
const profile_entity_1 = require("../entity/profile.entity");
const create_user_input_1 = require("../input files/create-user.input");
const update_user_input_1 = require("../input files/update-user.input");
const team_member_input_1 = require("../input files/team-member.input");
const public_decorator_1 = require("../../auth/public.decorator");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async getAllUsers() {
        return this.userService.getAllUsers();
    }
    async getUserById(id) {
        return this.userService.getUserById(id);
    }
    async createUser(createUserInput) {
        console.log("Received input in resolver:", JSON.stringify(createUserInput, null, 2));
        if (!createUserInput) {
            throw new Error('CreateUserInput is required');
        }
        return this.userService.createUser(createUserInput);
    }
    async updateUser(updateUserInput) {
        return this.userService.updateUser(updateUserInput);
    }
    async deleteUser(id) {
        return this.userService.deleteUser(id);
    }
    async inviteUser(id, input) {
        return this.userService.inviteTeamMember(id, input);
    }
    async getUsersByCompany(companyId) {
        return this.userService.getUsersByCompany(companyId);
    }
    async assignUserToCompany(userId, companyId) {
        return this.userService.assignUserToCompany(userId, companyId);
    }
    async setupPassword(userId, Password, confirmPassword) {
        return this.userService.setupPassword(userId, Password, confirmPassword);
    }
    async generateOtp(email) {
        return this.userService.generateAndSendOtp({ email });
    }
    async verifyOtp(email, otp) {
        return await this.userService.verifyotp(email, otp);
    }
    async getTeamMembers(companyId) {
        return this.userService.getTeamMembers(companyId);
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, graphql_1.Query)(() => [profile_entity_1.User], { name: 'getAllUsers' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getAllUsers", null);
__decorate([
    (0, graphql_1.Query)(() => profile_entity_1.User, { name: 'getUserById' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserById", null);
__decorate([
    (0, graphql_1.Mutation)(() => profile_entity_1.User, { name: 'createUser' }),
    (0, public_decorator_1.Public)(),
    __param(0, (0, graphql_1.Args)('createUserInput', { type: () => create_user_input_1.CreateUserInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => profile_entity_1.User, { name: 'updateUser' }),
    __param(0, (0, graphql_1.Args)('updateUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_input_1.UpdateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'deleteUser' }),
    (0, public_decorator_1.Public)(),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => profile_entity_1.User),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, team_member_input_1.InviteTeamMemberInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "inviteUser", null);
__decorate([
    (0, graphql_1.Query)(() => [profile_entity_1.User], { name: 'getUsersByCompany' }),
    __param(0, (0, graphql_1.Args)('companyId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUsersByCompany", null);
__decorate([
    (0, graphql_1.Mutation)(() => profile_entity_1.User, { name: 'assignUserToCompany' }),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('companyId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "assignUserToCompany", null);
__decorate([
    (0, graphql_1.Mutation)(returns => profile_entity_1.User),
    __param(0, (0, graphql_1.Args)('userId')),
    __param(1, (0, graphql_1.Args)('newPassword')),
    __param(2, (0, graphql_1.Args)('confirmPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "setupPassword", null);
__decorate([
    (0, graphql_1.Mutation)(returns => String),
    __param(0, (0, graphql_1.Args)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "generateOtp", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('email')),
    __param(1, (0, graphql_1.Args)('otp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "verifyOtp", null);
__decorate([
    (0, graphql_1.Query)(() => [profile_entity_1.User], { name: 'getTeamMembers' }),
    __param(0, (0, graphql_1.Args)('companyId', { type: () => graphql_1.Float })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getTeamMembers", null);
exports.UserResolver = UserResolver = __decorate([
    (0, graphql_1.Resolver)(() => profile_entity_1.User),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
//# sourceMappingURL=user.resolver.js.map