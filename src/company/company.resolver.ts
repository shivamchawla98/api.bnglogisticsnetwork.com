import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';
import { CreateCompanyInput } from './dto/create-company.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CreateCompanyLocationInput } from './dto/create-location.input';
import { CompanyLocation } from './location.entity';
import { UpdateCompanyServicesInput } from './dto/update-company-services.input';
import { Public } from '../auth/public.decorator';
import { ObjectType, Field } from '@nestjs/graphql';
import { UpdateCompanyProfileInput } from './dto/update-company-profile.input';
import { UpdateCompanyCertificationsInput } from './dto/update-company-certifications.input';
import { UpdateCompanyLocationInput } from './dto/update-location.input';
import { User } from '../user/entity/profile.entity';

@ObjectType()
class LocationFilters {
  @Field(() => [String])
  cities: string[];

  @Field(() => [String])
  countries: string[];
}

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Mutation(() => Company)
  @Public()
  async createCompany(
    @Args('createCompanyInput') createCompanyInput: CreateCompanyInput,
    @Args('userId', { type: () => ID }) userId: string,
  ): Promise<Company> {
    return this.companyService.createCompany(createCompanyInput, userId);
  }

  @Public()
  @Query(() => Company)
  async getCompanyById(@Args('id', { type: () => ID }) id: string): Promise<Company> {
    return this.companyService.getCompanyById(id);
  }

  @Query(() => [Company])
  @UseGuards(GqlAuthGuard)
  async getAllCompanies(): Promise<Company[]> {
    return this.companyService.getAllCompanies();
  }

  @Public()
  @Query(() => [Company])
  async searchCompanies(
    @Args('query', { type: () => String, nullable: true }) query: string,
    @Args('services', { type: () => [String], nullable: true }) services?: string[],
    @Args('certifications', { type: () => [String], nullable: true }) certifications?: string[],
    @Args('city', { type: () => String, nullable: true }) city?: string,
    @Args('state', { type: () => String, nullable: true }) state?: string,
    @Args('country', { type: () => String, nullable: true }) country?: string,
    @Args('name', { type: () => String, nullable: true }) name?: string,
  ): Promise<Company[]> {
    return this.companyService.searchCompanies(query, { 
      city, 
      state,
      country, 
      name,
      services,
      certifications
    });
  }

  @Public()
  @Query(() => LocationFilters)
  async getLocationFilters(): Promise<LocationFilters> {
    return this.companyService.getUniqueLocations();
  }

  @Mutation(() => User)
  @Public()
  async assignUserToCompany(
    @Args('userId', { type: () => ID }) userId: number,
    @Args('companyId', { type: () => ID }) companyId: number,
  ): Promise<User> {
    return this.companyService.assignUserToCompany(userId, companyId);
  }

  @Mutation(() => CompanyLocation)
  @Public()
  async createCompanyLocation(
    @Args('companyId', { type: () => ID }) companyId: string,
    @Args('input') input: CreateCompanyLocationInput,
  ): Promise<CompanyLocation> {
    console.log("input --- ", input)
    return this.companyService.createLocation(companyId, input);
  }

  @Mutation(() => Company)
  @UseGuards(GqlAuthGuard)
  async updateCompanyServices(
    @Args('companyId', { type: () => ID }) companyId: string,
    @Args('input', { type: () => UpdateCompanyServicesInput }) input: UpdateCompanyServicesInput,
  ): Promise<Company> {
    console.log('[Resolver] Received companyId:', companyId);
    console.log('[Resolver] Received input:', JSON.stringify(input, null, 2));

    if (!input || !input.services || !Array.isArray(input.services)) {
      throw new Error('Invalid input: services array is required');
    }

    if (input.services.length === 0) {
      throw new Error('At least one service is required');
    }

    return this.companyService.updateCompanyServices(companyId, input);
  }

  @Mutation(() => Company)
  @UseGuards(GqlAuthGuard)
  async updateCompanyCertifications(
    @Args('companyId', { type: () => ID }) companyId: string,
    @Args('input', { type: () => UpdateCompanyCertificationsInput }) input: UpdateCompanyCertificationsInput,
  ): Promise<Company> {
    console.log('[Resolver] Received companyId:', companyId);
    console.log('[Resolver] Received input:', JSON.stringify(input, null, 2));
    
    if (!input || !input.certifications || !Array.isArray(input.certifications)) {
      throw new Error('Invalid input: certifications array is required');
    }

    if (input.certifications.length === 0) {
      throw new Error('At least one certification is required');
    }

    const result = await this.companyService.updateCompanyCertifications(companyId, input);
    console.log('[Resolver] Service result:', JSON.stringify(result, null, 2));
    return result;
  }

  @Public()
  @Query(() => Company)
  async getCompanyProfile(@Args('companyId', { type: () => ID }) companyId: string): Promise<Company> {
    return this.companyService.getCompanyProfile(companyId);
  }

  @Public()
  @Query(() => Company)
  async getCompanyWithCertifications(@Args('companyId', { type: () => ID }) companyId: string): Promise<Company> {
    const company = await this.companyService.getCompanyById(companyId);
    return company;
  }

  @Mutation(() => Company)
  @UseGuards(GqlAuthGuard)
  async updateCompanyProfile(
    @Args('companyid', { type: () => ID }) companyId: string,
    @Args('input') input: UpdateCompanyProfileInput,
  ): Promise<Company> {
    try {
      const updatedCompany = await this.companyService.updateCompanyProfile(companyId, input);
      return updatedCompany;
    } catch (error) {
      throw new Error(`Failed to update company profile: ${error.message}`);
    }
  }

  @Mutation(() => CompanyLocation)
  @UseGuards(GqlAuthGuard)
  async updateCompanyLocation(
    @Args('locationId', { type: () => ID }) locationId: string,
    @Args('input') input: UpdateCompanyLocationInput,
  ): Promise<CompanyLocation> {
    return this.companyService.updateLocation(locationId, input);
  }

  @Mutation(() => Company)
  @UseGuards(GqlAuthGuard)
  async updateCompanyLogo(
    @Args('companyId', { type: () => ID }) companyId: string,
    @Args('logo', { type: () => String }) logo: string,
  ): Promise<Company> {
    return this.companyService.updateLogo(companyId, logo);
  }
}
