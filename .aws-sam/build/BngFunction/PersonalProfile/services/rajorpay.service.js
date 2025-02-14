"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RazorpayService = void 0;
const common_1 = require("@nestjs/common");
const Razorpay = require('razorpay');
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const profile_entity_1 = require("../entity/profile.entity");
const payment_entity_1 = require("../entity/payment.entity");
const subscription_entity_1 = require("../entity/subscription.entity");
const invoice_entity_1 = require("../entity/invoice.entity");
const crypto = require("crypto");
const plan_entity_1 = require("../entity/plan.entity");
let RazorpayService = class RazorpayService {
    constructor(userRepository, planRepository, paymentRepository, subscriptionRepository, invoiceRepository) {
        this.userRepository = userRepository;
        this.planRepository = planRepository;
        this.paymentRepository = paymentRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.invoiceRepository = invoiceRepository;
        this.razorpay = new Razorpay({
            key_id: 'rzp_live_Yd3O26f1FJi5Q4',
            key_secret: 'maOj7kX42tdnddaBuN9abEzS',
        });
    }
    async createRazorpayCustomer(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
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
    async savePaymentMethod(userId, paymentToken) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
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
    async createOrder(userId, amount, currency) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
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
    async completePayment(orderId, amount) {
        const payment = await this.razorpay.payments.capture(orderId, amount * 100, 'INR');
        const storedPayment = await this.paymentRepository.findOne({ where: { paymentId: orderId } });
        if (!storedPayment) {
            throw new Error('Payment not found');
        }
        storedPayment.status = payment.status;
        storedPayment.receiptUrl = payment.receipt_url;
        return await this.paymentRepository.save(storedPayment);
    }
    async capturePayment(paymentId, amount, currency) {
        const payment = await this.razorpay.payments.capture(paymentId, amount * 100, currency);
        const storedPayment = await this.paymentRepository.findOne({ where: { paymentId } });
        if (!storedPayment) {
            throw new Error('Payment not found');
        }
        storedPayment.status = payment.status;
        storedPayment.receiptUrl = payment.receipt_url;
        return await this.paymentRepository.save(storedPayment);
    }
    async createSubscription(userId, planId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }
        const subscription = await this.razorpay.subscriptions.create({
            plan_id: planId,
            total_count: 12,
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
    async cancelSubscription(subscriptionId) {
        const subscription = await this.razorpay.subscriptions.cancel(subscriptionId);
        const storedSubscription = await this.subscriptionRepository.findOne({ where: { subscriptionId } });
        if (!storedSubscription) {
            throw new Error('Subscription not found');
        }
        storedSubscription.status = subscription.status;
        await this.subscriptionRepository.save(storedSubscription);
    }
    async fetchAndStoreInvoices(userId) {
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
    async getUserInvoices(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['invoices'],
        });
        if (!user) {
            throw new Error('User not found');
        }
        return user.invoices;
    }
    async confirmPayment(paymentId, orderId, razorpaySignature) {
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
    async createAndStorePlan(name, amount, currency, period, interval) {
        try {
            const razorpayPlan = await this.razorpay.plans.create({
                period,
                interval,
                item: {
                    name,
                    amount: amount * 100,
                    currency,
                    description: "Description for the test plan",
                },
                notes: {
                    notes_key_1: "Tea, Earl Grey, Hot",
                    notes_key_2: "Tea, Earl Grey… decaf."
                }
            });
            const newPlan = this.planRepository.create({
                planId: razorpayPlan.id,
                name,
                amount,
                currency,
                period,
                interval,
            });
            return await this.planRepository.save(newPlan);
        }
        catch (error) {
            console.error('Error creating plan:', error);
            console.error('Error response:', error.response ? error.response.data : null);
            console.error('Error request:', error.request ? error.request : null);
            console.error('Error config:', error.config ? error.config : null);
            const errorMessage = error.response && error.response.error && error.response.error.description
                ? error.response.error.description
                : 'Unknown error from Razorpay';
            throw new Error('Failed to create plan: ' + errorMessage);
        }
    }
};
exports.RazorpayService = RazorpayService;
exports.RazorpayService = RazorpayService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(profile_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(plan_entity_1.Plan)),
    __param(2, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(3, (0, typeorm_1.InjectRepository)(subscription_entity_1.Subscription)),
    __param(4, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RazorpayService);
//# sourceMappingURL=rajorpay.service.js.map