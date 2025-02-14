import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response.input';
import { LoginUserInput } from './dto/login-user.input';
import { UserService } from 'src/PersonalProfile/services/user.service';
import { ResetPasswordInput } from './dto/reset-password.input';
import { User } from 'src/PersonalProfile/entity/profile.entity';
export declare class AuthResolver {
    private readonly authService;
    private readonly userService;
    private readonly logger;
    constructor(authService: AuthService, userService: UserService);
    findUserByEmail(email: string): Promise<User | null>;
    login(loginUserInput: LoginUserInput, context: any): Promise<LoginResponse>;
    logout(context: any): Promise<boolean>;
    resetPassword(userid: number, resetPasswordInput: ResetPasswordInput): Promise<User>;
}
