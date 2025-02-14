import { User } from './profile.entity';
import { Subscription } from './subscription.entity';
export declare class Payment {
    id: number;
    paymentId: string;
    amount: number;
    currency: string;
    status: string;
    receiptUrl: string;
    user: User;
    subscription: Subscription;
}
