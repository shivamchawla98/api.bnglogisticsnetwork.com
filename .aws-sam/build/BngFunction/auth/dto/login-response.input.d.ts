import { Company } from 'src/company/company.entity';
declare class UserInfo {
    id: number;
    email: string;
    phone?: string;
    company?: Company;
}
export declare class LoginResponse {
    access_token: string;
    user: UserInfo;
}
export {};
