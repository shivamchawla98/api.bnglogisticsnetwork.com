import { Injectable, BadRequestException, UnauthorizedException, Logger, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LessThan } from 'typeorm';
import { LoginResponse } from "./dto/login-response.input";
import { LoginUserInput } from "./dto/login-user.input";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from "src/user/entity/profile.entity";
import { UserService } from "src/user/services/user.service";
import { JwtBlacklist } from "./jwt-blacklist.entity";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly version = '1.0.1';

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(JwtBlacklist)
    private readonly blacklistedTokenRepository: Repository<JwtBlacklist>,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      this.logger.debug(`Attempting to validate user with email: ${email}`);
      
      if (!email || !password) {
        this.logger.error('Email or password is missing');
        throw new BadRequestException('Email and password are required');
      }

      let user: User;
      try {
        user = await this.userService.findUserByEmail(email);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new UnauthorizedException('Invalid email or password');
        }
        throw error;
      }

      this.logger.debug('User found, checking password');
      
      if (!user.password) {
        this.logger.error('User has no password set');
        throw new BadRequestException('Password not set for this account');
      }

      const isPasswordValid = password === user.password;
      
      if (!isPasswordValid) {
        this.logger.debug('Password mismatch');
        throw new UnauthorizedException('Invalid email or password');
      }

      this.logger.debug('User validated successfully');
      return user;
    } catch (error) {
      this.logger.error('Error in validateUser:', error);
      if (error instanceof UnauthorizedException || 
          error instanceof BadRequestException || 
          error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred during validation');
    }
  }

  async login(loginUserInput: LoginUserInput): Promise<LoginResponse> {
    try {
      const { email, password } = loginUserInput;
      const user = await this.validateUser(email, password);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { 
        email: user.email, 
        sub: user.id
      };

      const token = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '24h'
      });

      return {
        access_token: token,
        user: user
      };
    } catch (error) {
      this.logger.error('Login failed:', error);
      throw error;
    }
  }

  async logout(token: string): Promise<boolean> {
    try {
      this.logger.debug('Attempting to logout with token');
      
      if (!token) {
        throw new BadRequestException('Token is required for logout');
      }

      const jwtSecret = this.configService.get('jwt.secret');
      if (!jwtSecret) {
        throw new InternalServerErrorException('JWT configuration is missing');
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
    } catch (error) {
      this.logger.error('Error in logout:', error);
      if (error instanceof BadRequestException || 
          error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred during logout');
    }
  }

  async blacklistToken(token: string): Promise<void> {
    try {
      const decodedToken = this.jwtService.decode(token) as { exp: number };
      
      if (!decodedToken || !decodedToken.exp) {
        throw new BadRequestException('Invalid token format');
      }

      const blacklistedToken = this.blacklistedTokenRepository.create({
        token,
        expiresAt: new Date(decodedToken.exp * 1000), // Convert UNIX timestamp to Date
      });

      await this.blacklistedTokenRepository.save(blacklistedToken);
      
      // Clean up expired blacklisted tokens
      const now = new Date();
      await this.blacklistedTokenRepository.delete({
        expiresAt: LessThan(now),
      });
    } catch (error) {
      this.logger.error('Failed to blacklist token:', error);
      throw new InternalServerErrorException('Failed to process logout');
    }
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const blacklistedToken = await this.blacklistedTokenRepository.findOne({
      where: { token },
    });
    return !!blacklistedToken;
  }

  async validateToken(token: string): Promise<void> {
    try {
      if (!token) {
        throw new BadRequestException('Token is required');
      }

      const isBlacklisted = await this.isTokenBlacklisted(token);
      if (isBlacklisted) {
        throw new UnauthorizedException('Token has been revoked');
      }

      const jwtSecret = this.configService.get('jwt.secret');
      if (!jwtSecret) {
        throw new InternalServerErrorException('JWT configuration is missing');
      }

      await this.jwtService.verifyAsync(token, {
        secret: jwtSecret
      });
    } catch (error) {
      this.logger.error('Error validating token:', error);
      if (error instanceof UnauthorizedException || 
          error instanceof BadRequestException || 
          error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid token');
    }
  }

  async cleanupBlacklistedTokens(): Promise<void> {
    try {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() - 1);

      await this.blacklistedTokenRepository.delete({
        expiresAt: LessThan(expirationDate)
      });
      this.logger.debug('Cleaned up expired blacklisted tokens');
    } catch (error) {
      this.logger.error('Error cleaning up blacklisted tokens:', error);
      throw new InternalServerErrorException('Failed to cleanup blacklisted tokens');
    }
  }
}