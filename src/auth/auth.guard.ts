import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "./public.decorator";
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private configService: ConfigService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();
        
        const authHeader = req?.headers?.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
        }

        const token = authHeader.split(' ')[1];

        try {
            const secret = this.configService.get<string>('JWT_SECRET');
            if (!secret) {
                throw new Error('JWT_SECRET not configured');
            }

            const decoded = jwt.verify(token, secret);
            req.user = decoded;
            return true;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new HttpException('jwt expired', HttpStatus.UNAUTHORIZED);
            }
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }
}