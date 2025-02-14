import { ServiceType } from '../../enums/service-type.enum';
declare class ServiceInput {
    serviceName: ServiceType;
    status: string;
}
export declare class UpdateCompanyServicesInput {
    services: ServiceInput[];
}
export {};
