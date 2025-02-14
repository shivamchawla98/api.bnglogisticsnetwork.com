"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteCodeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const passport_1 = require("@nestjs/passport");
const invite_code_entity_1 = require("./invite-code.entity");
const invite_code_service_1 = require("./invite-code.service");
const invite_code_resolver_1 = require("./invite-code.resolver");
const auth_module_1 = require("../auth/auth.module");
let InviteCodeModule = class InviteCodeModule {
};
exports.InviteCodeModule = InviteCodeModule;
exports.InviteCodeModule = InviteCodeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([invite_code_entity_1.InviteCode]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            auth_module_1.AuthModule,
        ],
        providers: [invite_code_service_1.InviteCodeService, invite_code_resolver_1.InviteCodeResolver],
        exports: [invite_code_service_1.InviteCodeService],
    })
], InviteCodeModule);
//# sourceMappingURL=invite-code.module.js.map