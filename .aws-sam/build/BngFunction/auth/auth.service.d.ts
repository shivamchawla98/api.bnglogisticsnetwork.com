import { JwtService } from "@nestjs/jwt";
import { LoginResponse } from "./dto/login-response.input";
import { LoginUserInput } from "./dto/login-user.input";
import { Repository } from 'typeorm';
import { User } from "src/PersonalProfile/entity/profile.entity";
import { UserService } from "src/PersonalProfile/services/user.service";
import { JwtBlacklist } from "./jwt-blacklist.entity";
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly configService;
    private readonly userRepository;
    private readonly blacklistedTokenRepository;
    private readonly logger;
    private readonly version;
    constructor(userService: UserService, jwtService: JwtService, configService: ConfigService, userRepository: Repository<User>, blacklistedTokenRepository: Repository<JwtBlacklist>);
    validateUser(email: string, password: string): Promise<User | null>;
    login(loginUserInput: LoginUserInput): Promise<LoginResponse>;
    logout(token: string): Promise<boolean>;
    blacklistToken(token: string): Promise<void>;
    isTokenBlacklisted(token: string): Promise<boolean>;
    validateToken(token: string): Promise<void>;
    cleanupBlacklistedTokens(): Promise<void>;
}
