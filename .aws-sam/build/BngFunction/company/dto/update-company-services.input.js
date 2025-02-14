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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCompanyServicesInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const service_type_enum_1 = require("../../enums/service-type.enum");
let ServiceInput = class ServiceInput {
};
__decorate([
    (0, graphql_1.Field)(() => service_type_enum_1.ServiceType),
    __metadata("design:type", String)
], ServiceInput.prototype, "serviceName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ServiceInput.prototype, "status", void 0);
ServiceInput = __decorate([
    (0, graphql_1.InputType)()
], ServiceInput);
let UpdateCompanyServicesInput = class UpdateCompanyServicesInput {
};
exports.UpdateCompanyServicesInput = UpdateCompanyServicesInput;
__decorate([
    (0, graphql_1.Field)(() => [ServiceInput]),
    __metadata("design:type", Array)
], UpdateCompanyServicesInput.prototype, "services", void 0);
exports.UpdateCompanyServicesInput = UpdateCompanyServicesInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateCompanyServicesInput);
//# sourceMappingURL=update-company-services.input.js.map