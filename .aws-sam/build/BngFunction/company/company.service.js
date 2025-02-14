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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const company_entity_1 = require("./company.entity");
const profile_entity_1 = require("../PersonalProfile/entity/profile.entity");
const location_entity_1 = require("./location.entity");
const service_entity_1 = require("./service.entity");
let CompanyService = class CompanyService {
    constructor(companyRepository, userRepository, locationRepository, serviceRepository) {
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
        this.locationRepository = locationRepository;
        this.serviceRepository = serviceRepository;
    }
    async createCompany(createCompanyInput, userId) {
        const user = await this.userRepository.findOne({ where: { id: parseInt(userId) } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        const company = this.companyRepository.create(createCompanyInput);
        company.owner = user;
        company.users = [user];
        const savedCompany = await this.companyRepository.save(company);
        user.company = savedCompany;
        await this.userRepository.save(user);
        return this.companyRepository.findOne({
            where: { id: savedCompany.id },
            relations: ['owner', 'users']
        });
    }
    async getCompanyById(id) {
        const company = await this.companyRepository.findOne({
            where: { id: parseInt(id) },
            relations: ['users', 'locations', 'services', 'owner', 'certifications']
        });
        if (!company) {
            throw new common_1.NotFoundException(`Company with ID ${id} not found`);
        }
        return company;
    }
    async getAllCompanies() {
        return this.companyRepository.find({ relations: ['users', 'locations'] });
    }
    async assignUserToCompany(userId, companyId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        const company = await this.companyRepository.findOne({ where: { id: companyId } });
        if (!company) {
            throw new common_1.NotFoundException(`Company with ID ${companyId} not found`);
        }
        user.company = company;
        return this.userRepository.save(user);
    }
    async getCompanyProfile(companyId) {
        const company = await this.companyRepository.findOne({
            where: { id: parseInt(companyId) },
            relations: ['owner', 'locations', 'services', 'certifications'],
        });
        if (!company) {
            throw new common_1.NotFoundException(`Company with ID ${companyId} not found`);
        }
        return company;
    }
    async updateCompanyProfile(companyId, updateData) {
        const company = await this.companyRepository.findOne({
            where: { id: parseInt(companyId) },
            relations: ['owner', 'locations', 'services', 'certifications'],
        });
        if (!company) {
            throw new common_1.NotFoundException(`Company with ID ${companyId} not found`);
        }
        Object.keys(updateData).forEach(key => {
            if (updateData[key] !== undefined) {
                if (key === 'companySize') {
                    company['size'] = updateData[key];
                }
                else {
                    company[key] = updateData[key];
                }
            }
        });
        return this.companyRepository.save(company);
    }
    async createLocation(companyId, input) {
        const company = await this.companyRepository.findOne({
            where: { id: parseInt(companyId) }
        });
        if (!company) {
            throw new common_1.NotFoundException(`Company with ID ${companyId} not found`);
        }
        const location = this.locationRepository.create({
            ...input,
            company
        });
        return this.locationRepository.save(location);
    }
    async updateCompanyServices(companyId, input) {
        try {
            const company = await this.companyRepository.findOne({
                where: { id: parseInt(companyId) },
                relations: ['services']
            });
            if (!company) {
                throw new common_1.NotFoundException(`Company with ID ${companyId} not found`);
            }
            console.log("----- company ----", company);
            console.log("----- input ----", input.services);
            const existingServiceNames = company.services.map(s => s.serviceName);
            const newServiceNames = input.services.map(s => s.serviceName);
            const servicesToRemove = existingServiceNames.filter(name => !newServiceNames.includes(name));
            const servicesToAdd = input.services.filter(service => !existingServiceNames.includes(service.serviceName));
            if (servicesToRemove.length > 0) {
                await this.serviceRepository.delete({
                    company: { id: parseInt(companyId) },
                    serviceName: (0, typeorm_2.In)(servicesToRemove)
                });
            }
            if (servicesToAdd.length > 0) {
                const newServices = servicesToAdd.map(service => {
                    const newService = new service_entity_1.CompanyService();
                    newService.serviceName = service.serviceName;
                    newService.status = service.status;
                    newService.company = company;
                    return newService;
                });
                await this.serviceRepository.save(newServices);
            }
            const updatedCompany = await this.companyRepository.findOne({
                where: { id: parseInt(companyId) },
                relations: ['services', 'users', 'locations', 'owner', 'certifications']
            });
            if (!updatedCompany) {
                throw new Error('Failed to fetch updated company data');
            }
            return updatedCompany;
        }
        catch (error) {
            console.error('Error updating company services:', error);
            throw new Error(`Failed to update company services: ${error.message}`);
        }
    }
    async searchCompanies(query, filters) {
        const queryBuilder = this.companyRepository
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.owner', 'owner')
            .leftJoinAndSelect('company.locations', 'locations')
            .leftJoinAndSelect('company.services', 'services');
        if (query) {
            queryBuilder
                .where('LOWER(company.companyName) LIKE LOWER(:query)', { query: `%${query}%` })
                .orWhere('LOWER(company.description) LIKE LOWER(:query)', { query: `%${query}%` })
                .orWhere('LOWER(locations.city) LIKE LOWER(:query)', { query: `%${query}%` })
                .orWhere('LOWER(locations.country) LIKE LOWER(:query)', { query: `%${query}%` })
                .orWhere('LOWER(services.serviceName) LIKE LOWER(:query)', { query: `%${query}%` });
        }
        if (filters?.city) {
            queryBuilder.andWhere('LOWER(locations.city) = LOWER(:city)', { city: filters.city });
        }
        if (filters?.country) {
            queryBuilder.andWhere('LOWER(locations.country) = LOWER(:country)', { country: filters.country });
        }
        return queryBuilder.getMany();
    }
    async getUniqueLocations() {
        const locations = await this.locationRepository
            .createQueryBuilder('location')
            .select(['location.city', 'location.country'])
            .getMany();
        const cities = [...new Set(locations.map(l => l.city))].filter(Boolean);
        const countries = [...new Set(locations.map(l => l.country))].filter(Boolean);
        return {
            cities: cities.sort(),
            countries: countries.sort()
        };
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __param(1, (0, typeorm_1.InjectRepository)(profile_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(location_entity_1.CompanyLocation)),
    __param(3, (0, typeorm_1.InjectRepository)(service_entity_1.CompanyService)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CompanyService);
//# sourceMappingURL=company.service.js.map