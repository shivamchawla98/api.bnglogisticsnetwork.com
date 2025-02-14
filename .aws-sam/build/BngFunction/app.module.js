"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./PersonalProfile/user.module");
const company_module_1 = require("./company/company.module");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./config/configuration");
const profile_entity_1 = require("./PersonalProfile/entity/profile.entity");
const company_entity_1 = require("./company/company.entity");
const jwt_blacklist_entity_1 = require("./auth/jwt-blacklist.entity");
const payment_entity_1 = require("./PersonalProfile/entity/payment.entity");
const subscription_entity_1 = require("./PersonalProfile/entity/subscription.entity");
const invoice_entity_1 = require("./PersonalProfile/entity/invoice.entity");
const plan_entity_1 = require("./PersonalProfile/entity/plan.entity");
const location_entity_1 = require("./PersonalProfile/entity/location.entity");
const certification_entity_1 = require("./PersonalProfile/entity/certification.entity");
const teaminvite_entity_1 = require("./PersonalProfile/entity/teaminvite.entity");
const team_entity_1 = require("./PersonalProfile/entity/team.entity");
const location_entity_2 = require("./company/location.entity");
const service_entity_1 = require("./company/service.entity");
const user_additional_info_entity_1 = require("./PersonalProfile/entity/user-additional-info.entity");
const invite_code_module_1 = require("./invite-code/invite-code.module");
const invite_code_entity_1 = require("./invite-code/invite-code.entity");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("./auth/auth.guard");
const entities = [
    profile_entity_1.User,
    company_entity_1.Company,
    jwt_blacklist_entity_1.JwtBlacklist,
    payment_entity_1.Payment,
    subscription_entity_1.Subscription,
    invoice_entity_1.Invoice,
    plan_entity_1.Plan,
    location_entity_1.Location,
    certification_entity_1.Certification,
    team_entity_1.Team,
    teaminvite_entity_1.Invitation,
    location_entity_2.CompanyLocation,
    service_entity_1.CompanyService,
    user_additional_info_entity_1.UserAdditionalInfo,
    invite_code_entity_1.InviteCode,
];
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT || '5432'),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
                logging: true,
                migrationsRun: true,
                migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
                autoLoadEntities: true,
                cache: false,
                retryAttempts: 3,
                retryDelay: 1000,
                keepConnectionAlive: true,
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: 'src/schema.graphql',
                sortSchema: true,
                path: '/graphql',
                playground: true,
                context: ({ req, res }) => ({ req, res }),
            }),
            auth_module_1.AuthModule,
            user_module_1.PersonalProfileModule,
            company_module_1.CompanyModule,
            invite_code_module_1.InviteCodeModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            }
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map