"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalProfileModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_resolver_1 = require("./resolver/user.resolver");
const user_service_1 = require("./services/user.service");
const profile_entity_1 = require("./entity/profile.entity");
const team_entity_1 = require("./entity/team.entity");
const teaminvite_entity_1 = require("./entity/teaminvite.entity");
const payment_entity_1 = require("./entity/payment.entity");
const subscription_entity_1 = require("./entity/subscription.entity");
const invoice_entity_1 = require("./entity/invoice.entity");
const rajorpay_service_1 = require("./services/rajorpay.service");
const rajorpay_resolver_1 = require("./resolver/rajorpay.resolver");
const plan_entity_1 = require("./entity/plan.entity");
const location_entity_1 = require("./entity/location.entity");
const certification_entity_1 = require("./entity/certification.entity");
const company_entity_1 = require("../company/company.entity");
const user_additional_info_entity_1 = require("./entity/user-additional-info.entity");
const entities = [
    profile_entity_1.User,
    team_entity_1.Team,
    teaminvite_entity_1.Invitation,
    payment_entity_1.Payment,
    subscription_entity_1.Subscription,
    invoice_entity_1.Invoice,
    plan_entity_1.Plan,
    location_entity_1.Location,
    certification_entity_1.Certification,
    company_entity_1.Company,
    user_additional_info_entity_1.UserAdditionalInfo
];
let PersonalProfileModule = class PersonalProfileModule {
};
exports.PersonalProfileModule = PersonalProfileModule;
exports.PersonalProfileModule = PersonalProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature(entities)
        ],
        providers: [
            user_service_1.UserService,
            user_resolver_1.UserResolver,
            rajorpay_service_1.RazorpayService,
            rajorpay_resolver_1.RazorpayResolver,
        ],
        exports: [
            user_service_1.UserService,
            rajorpay_service_1.RazorpayService,
            typeorm_1.TypeOrmModule.forFeature(entities)
        ],
    })
], PersonalProfileModule);
//# sourceMappingURL=user.module.js.map