import { User } from './profile.entity';
export declare class Invoice {
    id: number;
    invoiceId: string;
    amount: number;
    status: string;
    invoiceUrl: string;
    user: User;
}
