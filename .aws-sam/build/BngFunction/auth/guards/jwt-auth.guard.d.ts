import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    private readonly logger;
    getRequest(context: ExecutionContext): any;
    handleRequest(err: any, user: any, info: any): any;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
export {};
