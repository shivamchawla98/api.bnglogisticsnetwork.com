import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyInput } from './dto/create-company.input';
import { User } from 'src/PersonalProfile/entity/profile.entity';
import { CompanyLocation } from './location.entity';
import { CreateCompanyLocationInput } from './dto/create-location.input';
import { CompanyService as CompanyServiceEntity } from './service.entity';
import { UpdateCompanyServicesInput } from './dto/update-company-services.input';
import { UpdateCompanyProfileInput } from './dto/update-company-profile.input';
export declare class CompanyService {
    private readonly companyRepository;
    private userRepository;
    private readonly locationRepository;
    private readonly serviceRepository;
    constructor(companyRepository: Repository<Company>, userRepository: Repository<User>, locationRepository: Repository<CompanyLocation>, serviceRepository: Repository<CompanyServiceEntity>);
    createCompany(createCompanyInput: CreateCompanyInput, userId: string): Promise<Company>;
    getCompanyById(id: string): Promise<Company>;
    getAllCompanies(): Promise<Company[]>;
    assignUserToCompany(userId: number, companyId: number): Promise<User>;
    getCompanyProfile(companyId: string): Promise<Company>;
    updateCompanyProfile(companyId: string, updateData: UpdateCompanyProfileInput): Promise<Company>;
    createLocation(companyId: string, input: CreateCompanyLocationInput): Promise<CompanyLocation>;
    updateCompanyServices(companyId: string, input: UpdateCompanyServicesInput): Promise<Company>;
    searchCompanies(query: string, filters?: {
        city?: string;
        country?: string;
    }): Promise<Company[]>;
    getUniqueLocations(): Promise<{
        cities: string[];
        countries: string[];
    }>;
}
