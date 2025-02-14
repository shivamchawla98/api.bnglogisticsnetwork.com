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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const typeorm_3 = require("typeorm");
const profile_entity_1 = require("../PersonalProfile/entity/profile.entity");
const user_service_1 = require("../PersonalProfile/services/user.service");
const jwt_blacklist_entity_1 = require("./jwt-blacklist.entity");
const config_1 = require("@nestjs/config");
let AuthService = AuthService_1 = class AuthService {
    constructor(userService, jwtService, configService, userRepository, blacklistedTokenRepository) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.userRepository = userRepository;
        this.blacklistedTokenRepository = blacklistedTokenRepository;
        this.logger = new common_1.Logger(AuthService_1.name);
        this.version = '1.0.1';
    }
    async validateUser(email, password) {
        try {
            this.logger.debug(`Attempting to validate user with email: ${email}`);
            if (!email || !password) {
                this.logger.error('Email or password is missing');
                throw new common_1.BadRequestException('Email and password are required');
            }
            let user;
            try {
                user = await this.userService.findUserByEmail(email);
            }
            catch (error) {
                if (error instanceof common_1.NotFoundException) {
                    throw new common_1.UnauthorizedException('Invalid email or password');
                }
                throw error;
            }
            this.logger.debug('User found, checking password');
            if (!user.password) {
                this.logger.error('User has no password set');
                throw new common_1.BadRequestException('Password not set for this account');
            }
            const isPasswordValid = password === user.password;
            if (!isPasswordValid) {
                this.logger.debug('Password mismatch');
                throw new common_1.UnauthorizedException('Invalid email or password');
            }
            this.logger.debug('User validated successfully');
            return user;
        }
        catch (error) {
            this.logger.error('Error in validateUser:', error);
            if (error instanceof common_1.UnauthorizedException ||
                error instanceof common_1.BadRequestException ||
                error instanceof common_1.InternalServerErrorException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('An unexpected error occurred during validation');
        }
    }
    async login(loginUserInput) {
        try {
            const { email, password } = loginUserInput;
            const user = await this.validateUser(email, password);
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            const payload = {
                email: user.email,
                sub: user.id
            };
            const token = this.jwtService.sign(payload, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: '24h'
            });
            return {
                access_token: token,
                user: user
            };
        }
        catch (error) {
            this.logger.error('Login failed:', error);
            throw error;
        }
    }
    async logout(token) {
        try {
            this.logger.debug('Attempting to logout with token');
            if (!token) {
                throw new common_1.BadRequestException('Token is required for logout');
            }
            const jwtSecret = this.configService.get('jwt.secret');
            if (!jwtSecret) {
                throw new common_1.InternalServerErrorException('JWT configuration is missing');
            }
            const decodedToken = this.jwtService.verify(token, {
                secret: jwtSecret,
            });
            const blacklistedToken = this.blacklistedTokenRepository.create({
                token,
                expiresAt: new Date(decodedToken.exp * 1000),
            });
            await this.blacklistedTokenRepository.save(blacklistedToken);
            this.logger.debug('Logout successful');
            return true;
        }
        catch (error) {
            this.logger.error('Error in logout:', error);
            if (error instanceof common_1.BadRequestException ||
                error instanceof common_1.InternalServerErrorException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('An unexpected error occurred during logout');
        }
    }
    async blacklistToken(token) {
        try {
            const decodedToken = this.jwtService.decode(token);
            if (!decodedToken || !decodedToken.exp) {
                throw new common_1.BadRequestException('Invalid token format');
            }
            const blacklistedToken = this.blacklistedTokenRepository.create({
                token,
                expiresAt: new Date(decodedToken.exp * 1000),
            });
            await this.blacklistedTokenRepository.save(blacklistedToken);
            const now = new Date();
            await this.blacklistedTokenRepository.delete({
                expiresAt: (0, typeorm_1.LessThan)(now),
            });
        }
        catch (error) {
            this.logger.error('Failed to blacklist token:', error);
            throw new common_1.InternalServerErrorException('Failed to process logout');
        }
    }
    async isTokenBlacklisted(token) {
        const blacklistedToken = await this.blacklistedTokenRepository.findOne({
            where: { token },
        });
        return !!blacklistedToken;
    }
    async validateToken(token) {
        try {
            if (!token) {
                throw new common_1.BadRequestException('Token is required');
            }
            const isBlacklisted = await this.isTokenBlacklisted(token);
            if (isBlacklisted) {
                throw new common_1.UnauthorizedException('Token has been revoked');
            }
            const jwtSecret = this.configService.get('jwt.secret');
            if (!jwtSecret) {
                throw new common_1.InternalServerErrorException('JWT configuration is missing');
            }
            await this.jwtService.verifyAsync(token, {
                secret: jwtSecret
            });
        }
        catch (error) {
            this.logger.error('Error validating token:', error);
            if (error instanceof common_1.UnauthorizedException ||
                error instanceof common_1.BadRequestException ||
                error instanceof common_1.InternalServerErrorException) {
                throw error;
            }
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    async cleanupBlacklistedTokens() {
        try {
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() - 1);
            await this.blacklistedTokenRepository.delete({
                expiresAt: (0, typeorm_1.LessThan)(expirationDate)
            });
            this.logger.debug('Cleaned up expired blacklisted tokens');
        }
        catch (error) {
            this.logger.error('Error cleaning up blacklisted tokens:', error);
            throw new common_1.InternalServerErrorException('Failed to cleanup blacklisted tokens');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_2.InjectRepository)(profile_entity_1.User)),
    __param(4, (0, typeorm_2.InjectRepository)(jwt_blacklist_entity_1.JwtBlacklist)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService,
        typeorm_3.Repository,
        typeorm_3.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map