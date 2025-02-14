import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InviteCodeService } from './invite-code.service';
import { InviteCode } from './invite-code.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/public.decorator';

@Resolver(() => InviteCode)
export class InviteCodeResolver {
  constructor(private readonly inviteCodeService: InviteCodeService) {}

  @Query(() => Boolean)
  @Public()
  async validateInviteCode(@Args('code') code: string): Promise<boolean> {
    return this.inviteCodeService.validateInviteCode(code);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async generateInviteCodes(
    @Args('count', { nullable: true }) count?: number,
  ): Promise<boolean> {
    await this.inviteCodeService.generateInviteCodes(count);
    return true;
  }
}
