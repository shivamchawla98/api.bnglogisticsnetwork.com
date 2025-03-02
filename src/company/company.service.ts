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
import { Management } from './entities/management.entity';
import { CreateManagementInput } from './dto/create-management.input';
import { UpdateManagementInput } from './dto/update-management.input';
import { Specialization } from './specialization.entity';

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
    @InjectRepository(Specialization)
    private readonly specializationRepository: Repository<Specialization>,
    @InjectRepository(Certification)
    private readonly certificationRepository: Repository<Certification>,
    @InjectRepository(Management)
    private readonly managementRepository: Repository<Management>,
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
        'specializations',
        'specializations.service',
        'certifications',
        'users',
        'management'
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
      relations: ['owner', 'locations', 'services', 'certifications', 'management'],
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    return company;
  }

  async updateCompanyProfile(companyId: string, updateData: UpdateCompanyProfileInput): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id: parseInt(companyId) },
      relations: ['owner', 'locations', 'services', 'certifications', 'management'],
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
    console.log('[Service] Received input:', JSON.stringify(input, null, 2));

    try {
      const company = await this.companyRepository.findOne({
        where: { id: parseInt(companyId) },
        relations: ['services', 'specializations', 'specializations.service']
      });

      if (!company) {
        throw new NotFoundException(`Company with ID ${companyId} not found`);
      }

      // First, delete existing specializations as they depend on services
      if (company.specializations?.length > 0) {
        console.log('[Service] Deleting existing specializations:', company.specializations.length);
        await this.specializationRepository.remove(company.specializations);
      }

      // Then, delete existing services
      if (company.services?.length > 0) {
        console.log('[Service] Deleting existing services:', company.services.length);
        await this.serviceRepository.remove(company.services);
      }

      // Add new services
      company.services = await Promise.all(
        input.services.map(async (serviceInput) => {
          const service = this.serviceRepository.create({
            serviceName: serviceInput.serviceName,
            status: serviceInput.status,
            company,
          });
          return await this.serviceRepository.save(service);
        }),
      );

      // Add new specializations if any
      if (input.specializations && input.specializations.length > 0) {
        const savedServices = await this.serviceRepository.find({
          where: { company: { id: company.id } }
        });

        company.specializations = await Promise.all(
          input.specializations.map(async (specName) => {
            const service = savedServices.find(s => s.serviceName === specName);
            if (!service) {
              throw new Error(`Service ${specName} not found for specialization`);
            }

            const specialization = this.specializationRepository.create({
              company,
              service
            });
            return await this.specializationRepository.save(specialization);
          })
        );
      } else {
        company.specializations = [];
      }

      // Save and return the updated company
      await this.companyRepository.save(company);
      return company;
    } catch (error) {
      console.error('[Service] Error updating company services:', error);
      throw error;
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

  async searchCompanies(
    query: string, 
    filters?: { 
      city?: string; 
      state?: string;
      country?: string; 
      name?: string;
      services?: string[];
      certifications?: string[];
    }
  ): Promise<Company[]> {
    const queryBuilder = this.companyRepository
      .createQueryBuilder('company')
      .leftJoinAndSelect('company.owner', 'owner')
      .leftJoinAndSelect('company.locations', 'locations')
      .leftJoinAndSelect('company.services', 'services')
      .leftJoinAndSelect('company.certifications', 'certifications');

    // Base query search
    if (query) {
      queryBuilder.where(`(
        LOWER(company.companyName) LIKE LOWER(:query) OR
        LOWER(company.description) LIKE LOWER(:query) OR
        LOWER(locations.city) LIKE LOWER(:query) OR
        LOWER(locations.country) LIKE LOWER(:query)
      )`, { query: `%${query}%` });
    }

    // Search by company name
    if (filters?.name) {
      if (query) {
        queryBuilder.andWhere('LOWER(company.companyName) LIKE LOWER(:name)', { name: `%${filters.name}%` });
      } else {
        queryBuilder.where('LOWER(company.companyName) LIKE LOWER(:name)', { name: `%${filters.name}%` });
      }
    }

    // Filter by city
    if (filters?.city) {
      queryBuilder.andWhere('LOWER(locations.city) = LOWER(:city)', { city: filters.city });
    }

    // Filter by state
    if (filters?.state) {
      queryBuilder.andWhere('LOWER(locations.state) = LOWER(:state)', { state: filters.state });
    }

    // Filter by country
    if (filters?.country) {
      queryBuilder.andWhere('LOWER(locations.country) = LOWER(:country)', { country: filters.country });
    }

    // Filter by services (using direct comparison with enum values)
    if (filters?.services && filters.services.length > 0) {
      queryBuilder.andWhere('services.serviceName IN (:...serviceNames)', { 
        serviceNames: filters.services 
      });
    }

    // Filter by certifications
    if (filters?.certifications && filters.certifications.length > 0) {
      queryBuilder.andWhere('certifications.certificationName IN (:...certNames)', { 
        certNames: filters.certifications 
      });
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

  async getCompanyManagement(companyId: string): Promise<Management[]> {
    const company = await this.companyRepository.findOne({
      where: { id: +companyId },
      relations: ['management'],
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    return company.management || [];
  }

  async getManagementMember(id: number): Promise<Management> {
    const member = await this.managementRepository.findOne({
      where: { id },
      relations: ['company'],
    });

    if (!member) {
      throw new NotFoundException(`Management member with ID ${id} not found`);
    }

    return member;
  }

  async createManagementMember(input: CreateManagementInput): Promise<Management> {
    const company = await this.companyRepository.findOne({
      where: { id: parseInt(input.companyId) },
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${input.companyId} not found`);
    }

    const member = this.managementRepository.create({
      ...input,
      companyId: parseInt(input.companyId),
      company
    });

    return this.managementRepository.save(member);
  }

  async updateManagementMember(input: {id: string } & UpdateManagementInput): Promise<Management> {
    if (!input.id) {
      throw new Error('Management member ID is required for update');
    }

    const member = await this.managementRepository.findOne({
      where: { id: parseInt(input.id) },
    });

    if (!member) {
      throw new NotFoundException(`Management member with ID ${input.id} not found`);
    }

    // Create a new object with only the fields that are present in the input
    const updateData = {
      ...(input.firstName !== undefined && { firstName: input.firstName }),
      ...(input.lastName !== undefined && { lastName: input.lastName }),
      ...(input.jobRole !== undefined && { jobRole: input.jobRole }),
      ...(input.department !== undefined && { department: input.department }),
      ...(input.email !== undefined && { email: input.email }),
      ...(input.mobile !== undefined && { mobile: input.mobile }),
      ...(input.whatsapp !== undefined && { whatsapp: input.whatsapp }),
      ...(input.linkedin !== undefined && { linkedin: input.linkedin }),
      ...(input.profilePicture !== undefined && { profilePicture: input.profilePicture })
    };
    
    Object.assign(member, updateData);
    
    return this.managementRepository.save(member);
  }

  async deleteManagementMember(id: number): Promise<boolean> {
    const result = await this.managementRepository.delete(id);
    return result.affected > 0;
  }
}
