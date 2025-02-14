import { Repository } from 'typeorm';
import { User } from '../entity/profile.entity';
import { Payment } from '../entity/payment.entity';
import { Subscription } from '../entity/subscription.entity';
import { Invoice } from '../entity/invoice.entity';
import { Plan } from '../entity/plan.entity';
export declare class RazorpayService {
    private userRepository;
    private planRepository;
    private paymentRepository;
    private subscriptionRepository;
    private invoiceRepository;
    private razorpay;
    constructor(userRepository: Repository<User>, planRepository: Repository<Plan>, paymentRepository: Repository<Payment>, subscriptionRepository: Repository<Subscription>, invoiceRepository: Repository<Invoice>);
    createRazorpayCustomer(userId: number): Promise<string>;
    savePaymentMethod(userId: number, paymentToken: string): Promise<void>;
    createOrder(userId: number, amount: number, currency: string): Promise<Payment>;
    completePayment(orderId: string, amount: number): Promise<Payment>;
    capturePayment(paymentId: string, amount: number, currency: string): Promise<Payment>;
    createSubscription(userId: number, planId: string): Promise<Subscription>;
    cancelSubscription(subscriptionId: string): Promise<void>;
    fetchAndStoreInvoices(userId: number): Promise<void>;
    getUserInvoices(userId: number): Promise<Invoice[]>;
    confirmPayment(paymentId: string, orderId: string, razorpaySignature: string): Promise<boolean>;
    createAndStorePlan(name: string, amount: number, currency: string, period: string, interval: number): Promise<Plan>;
}
