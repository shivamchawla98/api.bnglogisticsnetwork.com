import { User } from './profile.entity';
import { Payment } from './payment.entity';
export declare class Subscription {
    id: number;
    subscriptionId: string;
    planId: string;
    status: string;
    startDate: Date;
    endDate: Date;
    user: User;
    payments: Payment[];
}
