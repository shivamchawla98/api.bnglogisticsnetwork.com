import { RazorpayService } from '../services/rajorpay.service';
import { Payment } from '../entity/payment.entity';
import { Subscription } from '../entity/subscription.entity';
import { Invoice } from '../entity/invoice.entity';
import { Plan } from '../entity/plan.entity';
export declare class RazorpayResolver {
    private readonly razorpayService;
    constructor(razorpayService: RazorpayService);
    createorder(userId: number, amount: number, currency: string): Promise<Payment>;
    completePayment(orderId: string, amount: number): Promise<Payment>;
    capturePayment(paymentId: string, amount: number, currency: string): Promise<Payment>;
    createSubscription(userId: number, planId: string): Promise<Subscription>;
    cancelSubscription(subscriptionId: string): Promise<boolean>;
    savePaymentMethod(userId: number, paymentToken: string): Promise<boolean>;
    getUserInvoices(userId: number): Promise<Invoice[]>;
    confirmPayment(paymentId: string, orderId: string, razorpaySignature: string): Promise<boolean>;
    createAndStorePlan(name: string, amount: number, currency: string, period: string, interval: number): Promise<Plan>;
}
