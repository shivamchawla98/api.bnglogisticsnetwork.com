import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { RazorpayService } from '../services/rajorpay.service';
import { Payment } from '../entity/payment.entity';
import { Subscription } from '../entity/subscription.entity';
import { Invoice } from '../entity/invoice.entity';
import { Plan } from '../entity/plan.entity';
@Resolver()
export class RazorpayResolver {
  constructor(private readonly razorpayService: RazorpayService) {}

  // Mutation to create a payment
  @Mutation(() => Payment)
  async createorder(
    @Args('userId') userId: number,
    @Args('amount') amount: number,
    @Args('currency') currency: string,
  ): Promise<Payment> {
    return await this.razorpayService.createOrder(userId, amount, currency);
  }

  @Mutation(() => Payment)
  async completePayment(
    @Args('orderId') orderId: string,
    @Args('amount') amount: number
  ): Promise<Payment> {
    return this.razorpayService.completePayment(orderId, amount); 
  }
  

  // Mutation to capture a payment
  @Mutation(() => Payment)
  async capturePayment(
    @Args('paymentId') paymentId: string,
    @Args('amount') amount: number,
    @Args('currency') currency: string,
  ): Promise<Payment> {
    return await this.razorpayService.capturePayment(paymentId, amount, currency);
  }

  // Mutation to create a subscription
  @Mutation(() => Subscription)
  async createSubscription(
    @Args('userId') userId: number,
    @Args('planId') planId: string,
  ): Promise<Subscription> {
    return await this.razorpayService.createSubscription(userId, planId);
  }

  // Mutation to cancel a subscription
  @Mutation(() => Boolean)
  async cancelSubscription(@Args('subscriptionId') subscriptionId: string): Promise<boolean> {
    await this.razorpayService.cancelSubscription(subscriptionId);
    return true;
  }

  // Mutation to save payment method
  @Mutation(() => Boolean)
  async savePaymentMethod(
    @Args('userId') userId: number,
    @Args('paymentToken') paymentToken: string,
  ): Promise<boolean> {
    await this.razorpayService.savePaymentMethod(userId, paymentToken);
    return true;
  }

  // Query to fetch user invoices
  @Query(() => [Invoice])
  async getUserInvoices(@Args('userId') userId: number): Promise<Invoice[]> {
    await this.razorpayService.fetchAndStoreInvoices(userId); // Sync Razorpay invoices with database
    return this.razorpayService.getUserInvoices(userId);
  }

  @Mutation(() => Boolean)
async confirmPayment(
  @Args('paymentId') paymentId: string,
  @Args('orderId') orderId: string,
  @Args('razorpaySignature') razorpaySignature: string,
): Promise<boolean> {
  return await this.razorpayService.confirmPayment(paymentId, orderId, razorpaySignature);
}

@Mutation(() => Plan)
async createAndStorePlan(
  @Args('name') name: string,
  @Args('amount') amount: number,
  @Args('currency') currency: string,
  @Args('period') period: string,
  @Args('interval') interval: number,
): Promise<Plan> {
  return await this.razorpayService.createAndStorePlan(name, amount, currency, period, interval);
}
}
