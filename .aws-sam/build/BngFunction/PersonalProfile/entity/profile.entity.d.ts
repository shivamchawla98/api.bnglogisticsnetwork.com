import { JobRole } from '../../enums/job-profile.enums';
import { Timezone } from '../../enums/timezone.enums';
import { UserAdditionalInfo } from './user-additional-info.entity';
import { Payment } from './payment.entity';
import { Subscription } from './subscription.entity';
import { Invoice } from './invoice.entity';
import { Company } from '../../company/company.entity';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    JobRole: JobRole | null;
    timezone: Timezone;
    LinkedinProfile: string;
    imageurl: string;
    additionalInfo: UserAdditionalInfo | null;
    companies: Company[];
    company: Company;
    payments: Payment[];
    subscription: Subscription;
    razorpayCustomerId: string;
    paymentMethodToken: string;
    invoices: Invoice[];
    otp: string;
}
