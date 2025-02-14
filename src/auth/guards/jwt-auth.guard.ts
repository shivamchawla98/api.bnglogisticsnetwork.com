import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    
    // If using Apollo Sandbox/Playground, the headers might be in a different location
    if (!request.headers && request.raw) {
      request.headers = request.raw.headers;
    }

    this.logger.debug('Auth Headers:', request?.headers?.authorization);
    return request;
  }

  handleRequest(err: any, user: any, info: any) {
    this.logger.debug('JWT Auth Result:', { err, user, info });
    
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid or missing JWT token');
    }
    return user;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    
    this.logger.debug('Attempting JWT Authentication');
    this.logger.debug('Headers:', req?.headers);
    
    return super.canActivate(context);
  }
}