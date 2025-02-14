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
var AuthResolver_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("./auth.service");
const login_response_input_1 = require("./dto/login-response.input");
const login_user_input_1 = require("./dto/login-user.input");
const user_service_1 = require("../PersonalProfile/services/user.service");
const reset_password_input_1 = require("./dto/reset-password.input");
const profile_entity_1 = require("../PersonalProfile/entity/profile.entity");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const public_decorator_1 = require("./public.decorator");
let AuthResolver = AuthResolver_1 = class AuthResolver {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
        this.logger = new common_1.Logger(AuthResolver_1.name);
    }
    async findUserByEmail(email) {
        this.logger.debug(`Finding user by email: ${email}`);
        return this.userService.findUserByEmail(email);
    }
    async login(loginUserInput, context) {
        this.logger.debug('Login attempt with input:', loginUserInput);
        try {
            const userExists = await this.userService.findUserByEmail(loginUserInput.email);
            this.logger.debug('User lookup result:', userExists);
            const result = await this.authService.login(loginUserInput);
            this.logger.debug('Login successful');
            if (context.res) {
                context.res.header('Authorization', `Bearer ${result.access_token}`);
            }
            return result;
        }
        catch (error) {
            this.logger.error('Login failed:', error);
            throw error;
        }
    }
    async logout(context) {
        try {
            if (context.res) {
                context.res.header('Authorization', '');
            }
            return true;
        }
        catch (error) {
            this.logger.error('Logout failed:', error);
            return false;
        }
    }
    async resetPassword(userid, resetPasswordInput) {
        try {
            return await this.userService.resetPassword(userid, resetPasswordInput);
        }
        catch (error) {
            this.logger.error('Reset password failed:', error);
            throw error;
        }
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, graphql_1.Query)(() => profile_entity_1.User, { nullable: true }),
    (0, public_decorator_1.Public)(),
    __param(0, (0, graphql_1.Args)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "findUserByEmail", null);
__decorate([
    (0, graphql_1.Mutation)(() => login_response_input_1.LoginResponse),
    (0, public_decorator_1.Public)(),
    __param(0, (0, graphql_1.Args)('loginUserInput')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_input_1.LoginUserInput, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "logout", null);
__decorate([
    (0, graphql_1.Mutation)(() => profile_entity_1.User),
    (0, public_decorator_1.Public)(),
    __param(0, (0, graphql_1.Args)('userid')),
    __param(1, (0, graphql_1.Args)('resetPasswordInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, reset_password_input_1.ResetPasswordInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "resetPassword", null);
exports.AuthResolver = AuthResolver = AuthResolver_1 = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthResolver);
//# sourceMappingURL=auth.resolver.js.map