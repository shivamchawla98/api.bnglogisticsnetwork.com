import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, In, Not } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyInput } from './dto/create-company.input';
import { User } from '../user/entity/profile.entity';
import { CompanyLocation } from './location.entity';
import { CompanyService as CompanyServiceEntity } from './service.entity';
import { CreateCompanyLocationInput } from './dto/create-location.input';
import { UpdateCompanyServicesInput } from './dto/update-company-services.input';
import { UpdateCompanyProfileInput } from './dto/update-company-profile.input';
import { UpdateCompanyCertificationsInput } from './dto/update-company-certifications.input';
import { Certification } from '../user/entity/certification.entity';
import { UpdateCompanyLocationInput } from './dto/update-location.input';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(CompanyLocation)
    private readonly locationRepository: Repository<CompanyLocation>,
    @InjectRepository(CompanyServiceEntity)
    private readonly serviceRepository: Repository<CompanyServiceEntity>,
    @InjectRepository(Certification)
    private readonly certificationRepository: Repository<Certification>,
  ) {}

  async createCompany(createCompanyInput: CreateCompanyInput, userId: string): Promise<Company> {
    const user = await this.userRepository.findOne({ where: { id: parseInt(userId) } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const company = this.companyRepository.create(createCompanyInput);
    company.owner = user;
    company.users = [user];  // Add the creator as a user too
    const savedCompany = await this.companyRepository.save(company);

    // Update user's company
    user.company = savedCompany;
    await this.userRepository.save(user);

    // Return company with relations loaded
    return this.companyRepository.findOne({
      where: { id: savedCompany.id },
      relations: ['owner', 'users']
    });
  }

  async getCompanyById(id: string): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id: parseInt(id) },
      relations: [
        'owner',
        'locations',
        'services',
        'certifications',
        'users'
      ],
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return company;
  }

  async getAllCompanies(): Promise<Company[]> {
    return this.companyRepository.find({ relations: ['users', 'locations'] });
  }

  async assignUserToCompany(userId: number, companyId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const company = await this.companyRepository.findOne({ where: { id: companyId } });
    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    user.company = company;
    return this.userRepository.save(user);
  }

  async getCompanyProfile(companyId: string): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id: parseInt(companyId) },
      relations: ['owner', 'locations', 'services', 'certifications'],
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    return company;
  }

  async updateCompanyProfile(companyId: string, updateData: UpdateCompanyProfileInput): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id: parseInt(companyId) },
      relations: ['owner', 'locations', 'services', 'certifications'],
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    // Update only the fields that are provided in the input
    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined) {
        // Handle special case for companySize
        if (key === 'companySize') {
          company['size'] = updateData[key];
        } else {
          company[key] = updateData[key];
        }
      }
    });

    return this.companyRepository.save(company);
  }

  async createLocation(companyId: string, input: CreateCompanyLocationInput): Promise<CompanyLocation> {
    const company = await this.companyRepository.findOne({ 
      where: { id: parseInt(companyId) },
      relations: ['locations']
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    // If this location is being set as primary, update all other locations to non-primary
    if (input.isPrimary) {
      if (company.locations && company.locations.length > 0) {
        await this.locationRepository.update(
          { company: { id: parseInt(companyId) } },
          { isPrimary: false }
        );
      }
    }

    const location = this.locationRepository.create({
      ...input,
      company
    });

    return this.locationRepository.save(location);
  }

  async updateLocation(locationId: string, input: UpdateCompanyLocationInput): Promise<CompanyLocation> {
    try {
      const location = await this.locationRepository.findOne({ 
        where: { id: locationId },
        relations: ['company']
      });
      
      if (!location) {
        throw new Error('Location not found');
      }

      // If this location is being set as primary, update all other locations to non-primary
      if (input.isPrimary) {
        await this.locationRepository.update(
          { company: { id: location.company.id }, id: Not(locationId) },
          { isPrimary: false }
        );
      }

      // Update only the fields that are provided
      Object.assign(location, {
        ...input
      });

      return await this.locationRepository.save(location);
    } catch (error) {
      throw new Error(`Failed to update location: ${error.message}`);
    }
  }

  async updateCompanyServices(
    companyId: string,
    input: UpdateCompanyServicesInput,
  ): Promise<Company> {
    console.log('[Service] Received companyId:', companyId);
    console.log('[Service] Received input:', JSON.stringify(input, null, 2));

    try {
      const company = await this.companyRepository.findOne({
        where: { id: parseInt(companyId) },
        relations: ['services']
      });

      if (!company) {
        throw new NotFoundException(`Company with ID ${companyId} not found`);
      }

      // Delete existing services
      if (company.services?.length > 0) {
        console.log('[Service] Deleting existing services:', company.services.length);
        await this.serviceRepository.remove(company.services);
      }

      // Create new services
      console.log('[Service] Creating new services:', input.services.length);
      const newServices = input.services.map(service => 
        this.serviceRepository.create({
          serviceName: service.serviceName,
          status: service.status,
          isSpecialization: service.isSpecialization,
          company,
        })
      );

      // Save new services
      company.services = await this.serviceRepository.save(newServices);
      console.log('[Service] Saved new services:', company.services.length);

      // Refresh and return updated company
      const updatedCompany = await this.companyRepository.findOne({
        where: { id: parseInt(companyId) },
        relations: ['services']
      });

      if (!updatedCompany) {
        throw new Error('Failed to fetch updated company');
      }

      return updatedCompany;
    } catch (error) {
      console.error('[Service] Error updating services:', error);
      throw new Error(`Failed to update company services: ${error.message}`);
    }
  }

  async updateCompanyCertifications(
    companyId: string,
    input: UpdateCompanyCertificationsInput,
  ): Promise<Company> {
    console.log('[Service] Received companyId:', companyId);
    console.log('[Service] Received input:', JSON.stringify(input, null, 2));

    if (!input?.certifications?.length) {
      throw new Error('At least one certification is required');
    }

    const company = await this.companyRepository.findOne({
      where: { id: parseInt(companyId) },
      relations: ['certifications'],
    });

    console.log('[Service] Found company:', company ? 'yes' : 'no');

    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    // Delete existing certifications
    if (company.certifications?.length > 0) {
      console.log('[Service] Deleting existing certifications:', company.certifications.length);
      await this.certificationRepository.remove(company.certifications);
    }

    try {
      // Create new certifications
      console.log('[Service] Creating new certifications:', input.certifications.length);
      const newCertifications = input.certifications.map(cert => 
        this.certificationRepository.create({
          certificationName: cert.certificationName,
          status: cert.status,
          company,
        })
      );

      // Save new certifications
      company.certifications = await this.certificationRepository.save(newCertifications);
      console.log('[Service] Saved new certifications:', company.certifications.length);

      return this.companyRepository.save(company);
    } catch (error) {
      console.error('[Service] Error saving certifications:', error);
      throw new Error('Failed to save certifications: ' + error.message);
    }
  }

  async updateLogo(companyId: string, logo: string): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { id: parseInt(companyId) } });
    if (!company) {
      throw new Error('Company not found');
    }

    company.logo = logo;
    return this.companyRepository.save(company);
  }

  async searchCompanies(query: string, filters?: { city?: string; country?: string }): Promise<Company[]> {
    const queryBuilder = this.companyRepository
      .createQueryBuilder('company')
      .leftJoinAndSelect('company.owner', 'owner')
      .leftJoinAndSelect('company.locations', 'locations')
      .leftJoinAndSelect('company.services', 'services');

    if (query) {
      queryBuilder
        .where('LOWER(company.companyName) LIKE LOWER(:query)', { query: `%${query}%` })
        .orWhere('LOWER(company.description) LIKE LOWER(:query)', { query: `%${query}%` })
        .orWhere('LOWER(locations.city) LIKE LOWER(:query)', { query: `%${query}%` })
        .orWhere('LOWER(locations.country) LIKE LOWER(:query)', { query: `%${query}%` })
        .orWhere('LOWER(services.serviceName) LIKE LOWER(:query)', { query: `%${query}%` });
    }

    if (filters?.city) {
      queryBuilder.andWhere('LOWER(locations.city) = LOWER(:city)', { city: filters.city });
    }

    if (filters?.country) {
      queryBuilder.andWhere('LOWER(locations.country) = LOWER(:country)', { country: filters.country });
    }

    return queryBuilder.getMany();
  }

  async getUniqueLocations(): Promise<{ cities: string[]; countries: string[] }> {
    const locations = await this.locationRepository
      .createQueryBuilder('location')
      .select(['location.city', 'location.country'])
      .getMany();

    const cities = [...new Set(locations.map(l => l.city))].filter(Boolean);
    const countries = [...new Set(locations.map(l => l.country))].filter(Boolean);

    return {
      cities: cities.sort(),
      countries: countries.sort()
    };
  }
}
