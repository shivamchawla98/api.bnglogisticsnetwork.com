import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response.input';
import { LoginUserInput } from './dto/login-user.input';
import { UserService } from 'src/user/services/user.service';
import { ResetPasswordInput } from './dto/reset-password.input';
import { User } from 'src/user/entity/profile.entity';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from './public.decorator';

@Resolver()
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Query(() => User, { nullable: true })
  @Public()
  async findUserByEmail(@Args('email') email: string): Promise<User | null> {
    this.logger.debug(`Finding user by email: ${email}`);
    return this.userService.findUserByEmail(email);
  }

  @Mutation(() => LoginResponse)
  @Public()
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput, 
    @Context() context: any
  ): Promise<LoginResponse> {
    this.logger.debug('Login attempt with input:', loginUserInput);
    try {
      // First check if user exists
      const userExists = await this.userService.findUserByEmail(loginUserInput.email);
      this.logger.debug('User lookup result:', userExists);

      const result = await this.authService.login(loginUserInput);
      this.logger.debug('Login successful');
      
      // Set the token in response headers for better security
      if (context.res) {
        context.res.header('Authorization', `Bearer ${result.access_token}`);
      }
      
      return result;
    } catch (error) {
      this.logger.error('Login failed:', error);
      throw error;
    }
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async logout(@Context() context: any): Promise<boolean> {
    try {
      if (context.res) {
        context.res.header('Authorization', '');
      }
      return true;
    } catch (error) {
      this.logger.error('Logout failed:', error);
      return false;
    }
  }

  @Mutation(() => User)
  @Public()
  async resetPassword(
    @Args('userid') userid: number,
    @Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput
  ): Promise<User> {
    try {
      return await this.userService.resetPassword(userid, resetPasswordInput);
    } catch (error) {
      this.logger.error('Reset password failed:', error);
      throw error;
    }
  }
}