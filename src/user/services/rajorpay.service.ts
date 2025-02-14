import { Injectable } from '@nestjs/common';
const Razorpay = require('razorpay');
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/profile.entity';
import { Payment } from '../entity/payment.entity';
import { Subscription } from '../entity/subscription.entity';
import { Invoice } from '../entity/invoice.entity';
import * as crypto from 'crypto';
import { Plan } from '../entity/plan.entity';

@Injectable()
export class RazorpayService {
  private razorpay: any;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {
    this.razorpay = new Razorpay({
      key_id: 'rzp_live_Yd3O26f1FJi5Q4',
      key_secret:'maOj7kX42tdnddaBuN9abEzS',
    });
  }

  async createRazorpayCustomer(userId: number): Promise<string> {
    const user = await this.userRepository.findOne({where: {id: userId}});
    if (!user) {
      throw new Error('User not found');
    }

    if (user.razorpayCustomerId) {
      return user.razorpayCustomerId;
    }

    const customer = await this.razorpay.customers.create({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    });

    user.razorpayCustomerId = customer.id;
    await this.userRepository.save(user);

    return customer.id;
  }

  // Save Payment Method
  async savePaymentMethod(userId: number, paymentToken: string): Promise<void> {
    const user = await this.userRepository.findOne({where:{id: userId}});
    if (!user) {
      throw new Error('User not found');
    }

    const customerId = await this.createRazorpayCustomer(userId);

    const paymentMethod = await this.razorpay.customers.fundAccount({
      customer_id: customerId,
      account_number: paymentToken,
    });

    user.paymentMethodToken = paymentMethod.id;
    await this.userRepository.save(user);
  }

  async createOrder(userId: number, amount: number, currency: string): Promise<Payment> {
    const user = await this.userRepository.findOne({where:{id: userId}});
    if (!user) {
      throw new Error('User not found');
    }

    const order = await this.razorpay.orders.create({
      amount: amount * 100,
      currency,
      receipt: `receipt#${Date.now()}`,
    });
    console.log(order);

    const newPayment = this.paymentRepository.create({
      paymentId: order.id,
      amount,
      currency,
      status: 'Order Created',
      user,
    });

    return await this.paymentRepository.save(newPayment);
  }

  async completePayment(orderId: string, amount: number): Promise<Payment> {
    // Automatically capture payment when the order is created.
    const payment = await this.razorpay.payments.capture(orderId, amount * 100, 'INR');
    // Save the payment info to the database and update its status.
    const storedPayment = await this.paymentRepository.findOne({ where: { paymentId: orderId } });
    if (!storedPayment) {
      throw new Error('Payment not found');
    }
  
    storedPayment.status = payment.status;
    storedPayment.receiptUrl = payment.receipt_url;
    return await this.paymentRepository.save(storedPayment);
  }
  
  

  // Capture a payment
  async capturePayment(paymentId: string, amount: number, currency: string): Promise<Payment> {
    const payment = await this.razorpay.payments.capture(paymentId, amount * 100, currency);
    const storedPayment = await this.paymentRepository.findOne({ where: { paymentId } });

    if (!storedPayment) {
      throw new Error('Payment not found');
    }

    storedPayment.status = payment.status;
    storedPayment.receiptUrl = payment.receipt_url;
    return await this.paymentRepository.save(storedPayment);
  }

  
  async createSubscription(userId: number, planId: string): Promise<Subscription> {
    const user = await this.userRepository.findOne({where:{id:userId}});
    if (!user) {
      throw new Error('User not found');
    }

    const subscription = await this.razorpay.subscriptions.create({
      plan_id: planId,
      total_count: 12, // Example: 12 months
      customer_notify: 1,
    });

    const newSubscription = this.subscriptionRepository.create({
      subscriptionId: subscription.id,
      planId,
      status: subscription.status,
      startDate: new Date(),
      user,
    });

    return await this.subscriptionRepository.save(newSubscription);
  }

  // Cancel a subscription
  async cancelSubscription(subscriptionId: string): Promise<void> {
    const subscription = await this.razorpay.subscriptions.cancel(subscriptionId);
    const storedSubscription = await this.subscriptionRepository.findOne({ where: { subscriptionId } });

    if (!storedSubscription) {
      throw new Error('Subscription not found');
    }

    storedSubscription.status = subscription.status;
    await this.subscriptionRepository.save(storedSubscription);
  }


  async fetchAndStoreInvoices(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({
        where: { id: userId }, 
        relations: ['invoices'], 
      });
    if (!user) {
      throw new Error('User not found');
    }

    const invoices = await this.razorpay.invoices.all({ customer_id: user.razorpayCustomerId });

    for (const invoice of invoices.items) {
      const existingInvoice = await this.invoiceRepository.findOne({ where: { invoiceId: invoice.id } });
      if (!existingInvoice) {
        const newInvoice = this.invoiceRepository.create({
          invoiceId: invoice.id,
          amount: invoice.amount / 100,
          status: invoice.status,
          invoiceUrl: invoice.short_url,
          user,
        });
        await this.invoiceRepository.save(newInvoice);
      }
    }
  }

  
  async getUserInvoices(userId: number): Promise<Invoice[]> {
    const user = await this.userRepository.findOne({
        where: { id: userId }, 
        relations: ['invoices'], 
      });
    if (!user) {
      throw new Error('User not found');
    }
    return user.invoices;
  }

  async confirmPayment(paymentId: string, orderId: string, razorpaySignature: string): Promise<boolean> {
   
    const payment = await this.paymentRepository.findOne({ where: { paymentId } });
  
    if (!payment) {
      throw new Error('Payment not found');
    }
  
    
    const body = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', "maOj7kX42tdnddaBuN9abEzS") 
      .update(body.toString())
      .digest('hex');
  
    
    if (expectedSignature !== razorpaySignature) {
      throw new Error('Invalid payment signature');
    }
  
   
    payment.status = 'Confirmed';
    await this.paymentRepository.save(payment);
  
    return true; 
  }

  async createAndStorePlan(
    name: string,
    amount: number,
    currency: string,
    period: string,
    interval: number,
  ): Promise<Plan> {
    try {
      const razorpayPlan = await this.razorpay.plans.create({
        period,  // e.g., "weekly", "monthly", or "yearly"
        interval, // e.g., 1 for monthly, 12 for yearly
        item: {
          name, // e.g., "Test Plan - Weekly"
          amount: amount * 100, // Amount in the smallest currency unit (e.g., paise for INR)
          currency, // e.g., "INR"
          description: "Description for the test plan", // Optional description
        },
        notes: {
          notes_key_1: "Tea, Earl Grey, Hot",
          notes_key_2: "Tea, Earl Grey… decaf."
        }
      });
  
      // Store the plan in the database
      const newPlan = this.planRepository.create({
        planId: razorpayPlan.id,
        name,
        amount,
        currency,
        period,
        interval,
      });
  
      return await this.planRepository.save(newPlan);
    } catch (error) {
      console.error('Error creating plan:', error);
      
      // Log error response and other details from Razorpay if available
      console.error('Error response:', error.response ? error.response.data : null);
      console.error('Error request:', error.request ? error.request : null);
      console.error('Error config:', error.config ? error.config : null);
      
      const errorMessage = error.response && error.response.error && error.response.error.description
        ? error.response.error.description
        : 'Unknown error from Razorpay';
      
      throw new Error('Failed to create plan: ' + errorMessage);
    }
  }
  
}
