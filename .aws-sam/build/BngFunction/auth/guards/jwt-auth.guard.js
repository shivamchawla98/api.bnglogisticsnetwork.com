"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var JwtAuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const passport_1 = require("@nestjs/passport");
let JwtAuthGuard = JwtAuthGuard_1 = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(JwtAuthGuard_1.name);
    }
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        if (!request.headers && request.raw) {
            request.headers = request.raw.headers;
        }
        this.logger.debug('Auth Headers:', request?.headers?.authorization);
        return request;
    }
    handleRequest(err, user, info) {
        this.logger.debug('JWT Auth Result:', { err, user, info });
        if (err || !user) {
            throw err || new common_1.UnauthorizedException('Invalid or missing JWT token');
        }
        return user;
    }
    canActivate(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const { req } = ctx.getContext();
        this.logger.debug('Attempting JWT Authentication');
        this.logger.debug('Headers:', req?.headers);
        return super.canActivate(context);
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = JwtAuthGuard_1 = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map