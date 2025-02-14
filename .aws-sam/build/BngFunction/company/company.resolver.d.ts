import { CompanyService } from './company.service';
import { Company } from './company.entity';
import { CreateCompanyInput } from './dto/create-company.input';
import { User } from 'src/PersonalProfile/entity/profile.entity';
import { CreateCompanyLocationInput } from './dto/create-location.input';
import { CompanyLocation } from './location.entity';
import { UpdateCompanyServicesInput } from './dto/update-company-services.input';
import { UpdateCompanyProfileInput } from './dto/update-company-profile.input';
declare class LocationFilters {
    cities: string[];
    countries: string[];
}
export declare class CompanyResolver {
    private readonly companyService;
    constructor(companyService: CompanyService);
    createCompany(createCompanyInput: CreateCompanyInput, userId: string): Promise<Company>;
    getCompanyById(id: string): Promise<Company>;
    getAllCompanies(): Promise<Company[]>;
    searchCompanies(query: string, city?: string, country?: string): Promise<Company[]>;
    getLocationFilters(): Promise<LocationFilters>;
    assignUserToCompany(userId: number, companyId: number): Promise<User>;
    createCompanyLocation(companyId: string, input: CreateCompanyLocationInput): Promise<CompanyLocation>;
    updateCompanyServices(companyId: string, input: UpdateCompanyServicesInput): Promise<Company>;
    updateCompanyProfile(companyId: string, input: UpdateCompanyProfileInput): Promise<Company>;
}
export {};
