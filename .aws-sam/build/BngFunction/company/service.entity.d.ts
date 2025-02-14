import { Company } from './company.entity';
import { ServiceType } from '../enums/service-type.enum';
export declare class CompanyService {
    id: number;
    serviceName: ServiceType;
    status: string;
    company: Company;
}
