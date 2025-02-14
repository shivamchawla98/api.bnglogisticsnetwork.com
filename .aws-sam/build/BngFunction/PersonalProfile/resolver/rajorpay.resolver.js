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
exports.RazorpayResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const rajorpay_service_1 = require("../services/rajorpay.service");
const payment_entity_1 = require("../entity/payment.entity");
const subscription_entity_1 = require("../entity/subscription.entity");
const invoice_entity_1 = require("../entity/invoice.entity");
const plan_entity_1 = require("../entity/plan.entity");
let RazorpayResolver = class RazorpayResolver {
    constructor(razorpayService) {
        this.razorpayService = razorpayService;
    }
    async createorder(userId, amount, currency) {
        return await this.razorpayService.createOrder(userId, amount, currency);
    }
    async completePayment(orderId, amount) {
        return this.razorpayService.completePayment(orderId, amount);
    }
    async capturePayment(paymentId, amount, currency) {
        return await this.razorpayService.capturePayment(paymentId, amount, currency);
    }
    async createSubscription(userId, planId) {
        return await this.razorpayService.createSubscription(userId, planId);
    }
    async cancelSubscription(subscriptionId) {
        await this.razorpayService.cancelSubscription(subscriptionId);
        return true;
    }
    async savePaymentMethod(userId, paymentToken) {
        await this.razorpayService.savePaymentMethod(userId, paymentToken);
        return true;
    }
    async getUserInvoices(userId) {
        await this.razorpayService.fetchAndStoreInvoices(userId);
        return this.razorpayService.getUserInvoices(userId);
    }
    async confirmPayment(paymentId, orderId, razorpaySignature) {
        return await this.razorpayService.confirmPayment(paymentId, orderId, razorpaySignature);
    }
    async createAndStorePlan(name, amount, currency, period, interval) {
        return await this.razorpayService.createAndStorePlan(name, amount, currency, period, interval);
    }
};
exports.RazorpayResolver = RazorpayResolver;
__decorate([
    (0, graphql_1.Mutation)(() => payment_entity_1.Payment),
    __param(0, (0, graphql_1.Args)('userId')),
    __param(1, (0, graphql_1.Args)('amount')),
    __param(2, (0, graphql_1.Args)('currency')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], RazorpayResolver.prototype, "createorder", null);
__decorate([
    (0, graphql_1.Mutation)(() => payment_entity_1.Payment),
    __param(0, (0, graphql_1.Args)('orderId')),
    __param(1, (0, graphql_1.Args)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], RazorpayResolver.prototype, "completePayment", null);
__decorate([
    (0, graphql_1.Mutation)(() => payment_entity_1.Payment),
    __param(0, (0, graphql_1.Args)('paymentId')),
    __param(1, (0, graphql_1.Args)('amount')),
    __param(2, (0, graphql_1.Args)('currency')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], RazorpayResolver.prototype, "capturePayment", null);
__decorate([
    (0, graphql_1.Mutation)(() => subscription_entity_1.Subscription),
    __param(0, (0, graphql_1.Args)('userId')),
    __param(1, (0, graphql_1.Args)('planId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], RazorpayResolver.prototype, "createSubscription", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('subscriptionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RazorpayResolver.prototype, "cancelSubscription", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('userId')),
    __param(1, (0, graphql_1.Args)('paymentToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], RazorpayResolver.prototype, "savePaymentMethod", null);
__decorate([
    (0, graphql_1.Query)(() => [invoice_entity_1.Invoice]),
    __param(0, (0, graphql_1.Args)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RazorpayResolver.prototype, "getUserInvoices", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('paymentId')),
    __param(1, (0, graphql_1.Args)('orderId')),
    __param(2, (0, graphql_1.Args)('razorpaySignature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], RazorpayResolver.prototype, "confirmPayment", null);
__decorate([
    (0, graphql_1.Mutation)(() => plan_entity_1.Plan),
    __param(0, (0, graphql_1.Args)('name')),
    __param(1, (0, graphql_1.Args)('amount')),
    __param(2, (0, graphql_1.Args)('currency')),
    __param(3, (0, graphql_1.Args)('period')),
    __param(4, (0, graphql_1.Args)('interval')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String, String, Number]),
    __metadata("design:returntype", Promise)
], RazorpayResolver.prototype, "createAndStorePlan", null);
exports.RazorpayResolver = RazorpayResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [rajorpay_service_1.RazorpayService])
], RazorpayResolver);
//# sourceMappingURL=rajorpay.resolver.js.map