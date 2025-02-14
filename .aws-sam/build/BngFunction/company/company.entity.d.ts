import { User } from '../PersonalProfile/entity/profile.entity';
import { CompanyLocation } from './location.entity';
import { CompanyService } from './service.entity';
import { Certification } from '../PersonalProfile/entity/certification.entity';
export declare class Company {
    id: number;
    companyName: string;
    legalName: string;
    logo?: string;
    coverImage?: string;
    tagline?: string;
    description?: string;
    website?: string;
    size?: string;
    founded?: string;
    headquarters?: string;
    industries?: string[];
    socialLinks?: {
        platform: string;
        url: string;
    }[];
    owner: User;
    users: User[];
    locations: CompanyLocation[];
    services: CompanyService[];
    certifications: Certification[];
}
