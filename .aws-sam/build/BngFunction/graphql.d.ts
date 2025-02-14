export declare enum ContactType {
    FINANCIAL = "FINANCIAL",
    OPERATION = "OPERATION",
    PARTNERSHIPS = "PARTNERSHIPS",
    QUOTES = "QUOTES"
}
export declare enum JobProfile {
    Owner_Director = "Owner_Director",
    Pricing = "Pricing",
    Financial = "Financial",
    Manager = "Manager",
    Partnership_Dev = "Partnership_Dev",
    Business_Dev_Sales = "Business_Dev_Sales"
}
export declare enum location {
    Chandigarh_India = "Chandigarh_India",
    Chennai_India = "Chennai_India",
    Dehradun_India = "Dehradun_India",
    Kochin_India = "Kochin_India",
    Mumbai_India = "Mumbai_India",
    Noida_India = "Noida_India"
}
export declare enum Timezone {
    Asia_Calcutta = "Asia_Calcutta",
    Asia_Bangkok = "Asia_Bangkok",
    Asia_Colombo = "Asia_Colombo",
    Asia_Dhaka = "Asia_Dhaka",
    Asia_Dubai = "Asia_Dubai",
    Asia_HongKong = "Asia_HongKong",
    Asia_Ho_Chi_Minh = "Asia_Ho_Chi_Minh",
    Asia_Hovd = "Asia_Hovd",
    Asia_Almaty = "Asia_Almaty",
    Asia_Amman = "Asia_Amman",
    Asia_Baghdad = "Asia_Baghdad",
    Asia_Bhaku = "Asia_Bhaku",
    Asia_Beirut = "Asia_Beirut",
    Asia_jakarta = "Asia_jakarta",
    Asia_Jerusalem = "Asia_Jerusalem",
    Asia_Kabul = "Asia_Kabul",
    Asia_Karachi = "Asia_Karachi"
}
export declare class LoginUserInput {
    email: string;
    password: string;
}
export declare class ResetPasswordInput {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}
export declare class CreateUserInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email: string;
    phone?: Nullable<string>;
    password: string;
    confirmPassword: string;
    JobRole?: Nullable<JobProfile>;
    location?: Nullable<Location[]>;
    timezone?: Nullable<Timezone>;
    LinkedinProfile?: Nullable<string>;
    imageurl?: Nullable<string>;
    additionalInfo?: Nullable<CreateUserAdditionalInfoInput>;
}
export declare class CreateUserAdditionalInfoInput {
    contactType?: Nullable<ContactType[]>;
    contactSpecification?: Nullable<string>;
    email?: Nullable<string>;
    phoneno?: Nullable<string>;
    whatsapp: boolean;
    msg: boolean;
}
export declare class UpdateUserInput {
    id: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    phone?: Nullable<string>;
    password?: Nullable<string>;
    confirmPassword?: Nullable<string>;
    JobRole?: Nullable<JobProfile>;
    location?: Nullable<Location[]>;
    timezone?: Nullable<Timezone>;
    additionalInfo?: Nullable<CreateUserAdditionalInfoInput>;
}
export declare class InviteTeamMemberInput {
    email: string;
    JobRole: JobProfile;
    location?: Nullable<Location[]>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    canManageTeam?: Nullable<boolean>;
}
export declare class CreateCompanyInput {
    companyName: string;
    legalName?: Nullable<string>;
    website?: Nullable<string>;
    companySize?: Nullable<string>;
    description?: Nullable<string>;
    coverImage?: Nullable<string>;
}
export declare class CreateCompanyLocationInput {
    city: string;
    country: string;
    address: string;
    status: string;
    contacts: string;
}
export declare class UpdateCompanyServicesInput {
    services: string[];
}
export declare class UserAdditionalInfo {
    id: string;
    contactType?: Nullable<ContactType[]>;
    contactSpecification?: Nullable<string>;
    email?: Nullable<string>;
    phoneno?: Nullable<string>;
    whatsapp?: Nullable<boolean>;
    msg?: Nullable<boolean>;
    user: User;
}
export declare abstract class ISubscription {
    id: string;
    subscriptionId: string;
    planId: string;
    status: string;
    startDate: DateTime;
    endDate?: Nullable<DateTime>;
    user: User;
    payments?: Nullable<Payment[]>;
}
export declare class Payment {
    id: string;
    paymentId: string;
    amount: number;
    currency: string;
    status: string;
    receiptUrl?: Nullable<string>;
    user: User;
    subscription?: Nullable<ISubscription>;
}
export declare class Invoice {
    id: string;
    invoiceId: string;
    amount: number;
    status: string;
    invoiceUrl: string;
    user: User;
}
export declare class CompanyLocation {
    id: string;
    city: string;
    country: string;
    address: string;
    status: string;
    contacts: string;
    company: Company;
}
export declare class CompanyService {
    id: string;
    serviceName: string;
    status: string;
    company: Company;
}
export declare class Certification {
    id: string;
    certificationName: string;
    status: string;
    company: Company;
}
export declare class Company {
    id: string;
    companyName?: Nullable<string>;
    legalName?: Nullable<string>;
    logo?: Nullable<string>;
    coverImage?: Nullable<string>;
    tagline?: Nullable<string>;
    description?: Nullable<string>;
    website?: Nullable<string>;
    size?: Nullable<string>;
    founded?: Nullable<string>;
    headquarters?: Nullable<string>;
    industries?: Nullable<string[]>;
    socialLinks?: Nullable<string[]>;
    owner: User;
    users?: Nullable<User[]>;
    locations: CompanyLocation[];
    services: CompanyService[];
    certifications: Certification[];
}
export declare class User {
    id: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email: string;
    phone?: Nullable<string>;
    password: string;
    confirmPassword?: Nullable<string>;
    JobRole?: Nullable<JobProfile>;
    location?: Nullable<Location[]>;
    timezone?: Nullable<Timezone>;
    LinkedinProfile?: Nullable<string>;
    imageurl?: Nullable<string>;
    additionalInfo?: Nullable<UserAdditionalInfo>;
    companies?: Nullable<Company[]>;
    company?: Nullable<Company>;
    payments?: Nullable<Payment[]>;
    subscription?: Nullable<ISubscription>;
    razorpayCustomerId?: Nullable<string>;
    paymentMethodToken?: Nullable<string>;
    invoices?: Nullable<Invoice[]>;
    otp?: Nullable<string>;
}
export declare class Team {
    id: string;
    name: string;
    invitations?: Nullable<Invitation[]>;
}
export declare class Invitation {
    id: string;
    email: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    jobRole?: Nullable<JobProfile>;
    contactRole?: Nullable<string>;
    accepted: boolean;
    team: Team;
    token: string;
}
export declare class UserInfo {
    id: number;
    email: string;
    phone?: Nullable<string>;
    company?: Nullable<Company>;
}
export declare class LoginResponse {
    access_token: string;
    user: UserInfo;
}
export declare class Plan {
    id: string;
    planId: string;
    name: string;
    amount: number;
    currency: string;
    period: string;
    interval: number;
}
export declare abstract class IQuery {
    findUserByEmail?: Nullable<User>;
    getAllUsers: User[];
    getUserById?: User;
    getUsersByCompany?: User[];
    getTeamMembers?: User[];
    getUserInvoices?: Invoice[];
    getCompanyById?: Company;
    getAllCompanies: Company[];
}
export declare abstract class IMutation {
    login?: LoginResponse;
    logout: boolean;
    resetPassword?: User;
    createUser?: User;
    updateUser?: User;
    deleteUser?: boolean;
    inviteUser?: User;
    assignUserToCompany?: User;
    setupPassword?: User;
    generateOtp?: string;
    verifyOtp?: boolean;
    createorder?: Payment;
    completePayment?: Payment;
    capturePayment?: Payment;
    createSubscription?: ISubscription;
    cancelSubscription?: boolean;
    savePaymentMethod?: boolean;
    confirmPayment?: boolean;
    createAndStorePlan?: Plan;
    createCompany?: Company;
    createCompanyLocation?: CompanyLocation;
    updateCompanyServices?: Company;
}
export type DateTime = any;
type Nullable<T> = T | null;
export {};
