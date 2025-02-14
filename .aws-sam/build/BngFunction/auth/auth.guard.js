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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const core_1 = require("@nestjs/core");
const public_decorator_1 = require("./public.decorator");
const jwt = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
let AuthGuard = class AuthGuard {
    constructor(reflector, configService) {
        this.reflector = reflector;
        this.configService = configService;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const { req } = ctx.getContext();
        const authHeader = req?.headers?.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.HttpException('Unauthorized access', common_1.HttpStatus.UNAUTHORIZED);
        }
        const token = authHeader.split(' ')[1];
        try {
            const secret = this.configService.get('JWT_SECRET');
            if (!secret) {
                throw new Error('JWT_SECRET not configured');
            }
            const decoded = jwt.verify(token, secret);
            req.user = decoded;
            return true;
        }
        catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new common_1.HttpException('jwt expired', common_1.HttpStatus.UNAUTHORIZED);
            }
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        config_1.ConfigService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map