import { Resolver, Query, Mutation, Args, ID, Int, Float } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { User } from '../entity/profile.entity';
import { CreateUserInput } from '../input files/create-user.input';
import { UpdateUserInput } from '../input files/update-user.input';
import { Invitation } from '../entity/teaminvite.entity';
import { InviteMemberInput } from '../input files/invite.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Location } from '../entity/location.entity';
import { Service } from '../entity/service.entity';
import { Certification } from '../entity/certification.entity';
import { InviteTeamMemberInput } from '../input files/team-member.input';
import { CreateLocationInput } from '../input files/create-location.input';
import { UpdateLocationInput } from '../input files/update-location.input';
import { CreateServiceInput } from '../input files/create-service.input';
import { UpdateServiceInput } from '../input files/update-service.input';
import { CreateCertificationInput } from '../input files/create-certification.input';
import { UpdateCertificationInput } from '../input files/update-certification.input';
import { Public } from 'src/auth/public.decorator';

interface OtpRequest {
  email: string;
}

interface OtpResponse {
  otp: string;
}
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => [User], { name: 'getAllUsers' })
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Query(() => User, { name: 'getUserById' })
  async getUserById(@Args('id', { type: () => ID }) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Mutation(() => User, { name: 'createUser' })
  @Public()
  async createUser(
    @Args('createUserInput', { type: () => CreateUserInput }) createUserInput: CreateUserInput
  ): Promise<User> {
    console.log("Received input in resolver:", JSON.stringify(createUserInput, null, 2));
    if (!createUserInput) {
      throw new Error('CreateUserInput is required');
    }
    return this.userService.createUser(createUserInput);
  }

  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput): Promise<User> {
    return this.userService.updateUser(updateUserInput);
  }

  @Mutation(() => Boolean, { name: 'deleteUser' })
  @Public()
  async deleteUser(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    return this.userService.deleteUser(id);
  }
  @Mutation(() => User)
  async inviteUser(
    @Args('id', { type: () => ID }) id: number,
    @Args('input', { type: () => CreateUserInput }) input: CreateUserInput
  ): Promise<User> {
    console.log("Input received in resolver:", {
      id,
      input
    });

    if (!input || !input.email) {
      throw new Error('Invalid input: email is required');
    }

    return this.userService.inviteTeamMember(id, input);
  }

  @Query(() => [User], { name: 'getUsersByCompany' })
  async getUsersByCompany(
    @Args('companyId', { type: () => Int }) companyId: number): Promise<User[]> {
    return this.userService.getUsersByCompany(companyId);
  }

  @Mutation(() => User, { name: 'assignUserToCompany' })
  async assignUserToCompany(@Args('userId', { type: () => Int }) userId: number,
    @Args('companyId', { type: () => Int }) companyId: number,
  ): Promise<User> {
    return this.userService.assignUserToCompany(userId, companyId);
  }



  @Mutation(returns => User)
  async setupPassword(@Args('userId') userId: number, @Args('newPassword') Password: string, @Args('confirmPassword') confirmPassword: string) {
    return this.userService.setupPassword(userId, Password, confirmPassword)
  }

  @Mutation(returns => String)
  async generateOtp(@Args('email') email: string): Promise<string> {
    return this.userService.generateAndSendOtp({ email });
  }
  @Mutation(() => Boolean)
  async verifyOtp(
    @Args('email') email: string,
    @Args('otp') otp: string,
  ): Promise<boolean> {
    return await this.userService.verifyotp(email, otp)
  }

  @Query(() => [User], { name: 'getTeamMembers' })
  async getTeamMembers(
    @Args('companyId', { type: () => Float }) companyId: number
  ): Promise<User[]> {
    return this.userService.getTeamMembers(companyId);
  }
}
