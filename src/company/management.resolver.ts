import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Management } from './entities/management.entity';
import { CreateManagementInput } from './dto/create-management.input';
import { UpdateManagementInput } from './dto/update-management.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver(() => Management)
@UseGuards(JwtAuthGuard)
export class ManagementResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Query(() => [Management])
  async getCompanyManagement(
    @Args('companyId', { type: () => ID }) companyId: string,
  ) {
    return this.companyService.getCompanyManagement(companyId);
  }

  @Query(() => Management)
  async getManagementMember(
    @Args('id', { type: () => ID }) id: string,
  ) {
    return this.companyService.getManagementMember(parseInt(id));
  }

  @Mutation(() => Management)
  async createManagementMember(
    @Args('input') input: CreateManagementInput,
  ) {
    console.log("Input received in resolver:", input);
    return this.companyService.createManagementMember(input);
  }

  @Mutation(() => Management)
  async updateManagementMember(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateManagementInput,
  ) {
    console.log("Input received in resolver:", {id, ...input});
    return this.companyService.updateManagementMember({id, ...input});
  }

  @Mutation(() => Boolean)
  async deleteManagementMember(
    @Args('id', { type: () => ID }) id: string,
  ) {
    return this.companyService.deleteManagementMember(parseInt(id));
  }
}
