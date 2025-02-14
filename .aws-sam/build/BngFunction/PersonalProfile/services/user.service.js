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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const teaminvite_entity_1 = require("../entity/teaminvite.entity");
const location_entity_1 = require("../entity/location.entity");
const certification_entity_1 = require("../entity/certification.entity");
const profile_entity_1 = require("../entity/profile.entity");
const user_additional_info_entity_1 = require("../entity/user-additional-info.entity");
const company_entity_1 = require("../../company/company.entity");
const client_ses_1 = require("@aws-sdk/client-ses");
let UserService = class UserService {
    constructor(locationRepository, certificationRepository, userRepository, invitationRepository, companyRepository) {
        this.locationRepository = locationRepository;
        this.certificationRepository = certificationRepository;
        this.userRepository = userRepository;
        this.invitationRepository = invitationRepository;
        this.companyRepository = companyRepository;
        this.ses = new client_ses_1.SESClient({ region: 'ap-south-1' });
    }
    async createUser(createUserInput) {
        console.log('Creating user with input:', JSON.stringify(createUserInput, null, 2));
        const { password, confirmPassword, email, phone } = createUserInput;
        if (!password) {
            throw new common_1.BadRequestException('Password is required');
        }
        if (!confirmPassword) {
            throw new common_1.BadRequestException('Confirm password is required');
        }
        if (password !== confirmPassword) {
            throw new common_1.BadRequestException('Password and confirm password do not match.');
        }
        const existingEmail = await this.userRepository.findOne({ where: { email } });
        if (existingEmail) {
            throw new common_1.BadRequestException('Email already registered');
        }
        if (phone) {
            const existingPhone = await this.userRepository.findOne({ where: { phone } });
            if (existingPhone) {
                throw new common_1.BadRequestException('Phone number already registered');
            }
        }
        try {
            const hashedPassword = password;
            const newUser = this.userRepository.create({
                ...createUserInput,
                password: hashedPassword,
            });
            console.log('Saving user...');
            return await this.userRepository.save(newUser);
        }
        catch (error) {
            console.error('Error creating user:', error);
            throw new common_1.BadRequestException(`Failed to create user: ${error.message}`);
        }
    }
    async getAllUsers() {
        return await this.userRepository.find();
    }
    async findUserByEmail(email) {
        if (!email) {
            throw new common_1.BadRequestException('Email is required');
        }
        try {
            const user = await this.userRepository.findOne({
                where: { email },
                relations: ['company']
            });
            if (!user) {
                throw new common_1.NotFoundException(`User with email ${email} not found`);
            }
            return user;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Error finding user: ${error.message}`);
        }
    }
    async getUserById(id) {
        return await this.userRepository.findOne({
            where: { id },
            relations: ['company']
        });
    }
    async updateUser(updateUserInput) {
        const user = await this.userRepository.findOne({
            where: { id: updateUserInput.id },
            relations: ['additionalInfo']
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${updateUserInput.id} not found`);
        }
        if (updateUserInput.email)
            user.email = updateUserInput.email;
        if (updateUserInput.phone)
            user.phone = updateUserInput.phone;
        if (updateUserInput.JobRole)
            user.JobRole = updateUserInput.JobRole;
        if (updateUserInput.timezone)
            user.timezone = updateUserInput.timezone;
        if (updateUserInput.additionalInfo) {
            if (!user.additionalInfo) {
                user.additionalInfo = new user_additional_info_entity_1.UserAdditionalInfo();
            }
            Object.assign(user.additionalInfo, updateUserInput.additionalInfo);
        }
        const savedUser = await this.userRepository.save(user);
        return await this.userRepository.findOne({
            where: { id: savedUser.id },
            relations: ['additionalInfo']
        });
    }
    async deleteUser(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['additionalInfo'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return await this.userRepository.manager.transaction(async (transactionalEntityManager) => {
            try {
                if (user.additionalInfo) {
                    await transactionalEntityManager.delete(user_additional_info_entity_1.UserAdditionalInfo, user.additionalInfo.id);
                }
                const result = await transactionalEntityManager.delete(profile_entity_1.User, id);
                return result.affected > 0;
            }
            catch (error) {
                throw new common_1.BadRequestException(`Failed to delete user. Error: ${error.message}`);
            }
        });
    }
    async resetPassword(userId, resetPasswordInput) {
        try {
            const { oldPassword, newPassword, confirmPassword } = resetPasswordInput;
            if (newPassword !== confirmPassword) {
                throw new common_1.BadRequestException({
                    code: 'PASSWORD_MISMATCH',
                    message: 'New password and confirm password do not match.'
                });
            }
            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new common_1.NotFoundException({
                    code: 'USER_NOT_FOUND',
                    message: `User with ID ${userId} not found`
                });
            }
            console.log(oldPassword, user.password);
            const isPasswordValid = user.password === oldPassword;
            if (!isPasswordValid) {
                throw new common_1.BadRequestException({
                    code: 'INVALID_OLD_PASSWORD',
                    message: 'The current password you entered is incorrect.'
                });
            }
            const hashedPassword = newPassword;
            user.password = hashedPassword;
            return await this.userRepository.save(user);
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException || error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error('Password reset error:', error);
            throw new common_1.BadRequestException({
                code: 'PASSWORD_RESET_FAILED',
                message: 'Failed to reset password. Please try again later.'
            });
        }
    }
    async updateLocation(id, updateLocationInput) {
        const location = await this.locationRepository.preload({
            id,
            ...updateLocationInput,
        });
        if (!location) {
            throw new common_1.NotFoundException('Location not found');
        }
        return this.locationRepository.save(location);
    }
    async getLocationById(id) {
        const location = await this.locationRepository.findOne({ where: { id }, relations: ['company',] });
        if (!location) {
            throw new common_1.NotFoundException('Location not found');
        }
        return location;
    }
    async getAllLocations() {
        return this.locationRepository.find({ relations: ['company',] });
    }
    async deleteLocation(id) {
        const result = await this.locationRepository.delete(id);
        return result.affected > 0;
    }
    async updateCertification(id, updateCertificationInput) {
        const certification = await this.certificationRepository.preload({
            id,
            ...updateCertificationInput,
        });
        if (!certification) {
            throw new common_1.NotFoundException('Certification not found');
        }
        return this.certificationRepository.save(certification);
    }
    async getCertificationById(id) {
        const certification = await this.certificationRepository.findOne({ where: { id }, relations: ['company'] });
        if (!certification) {
            throw new common_1.NotFoundException('Certification not found');
        }
        return certification;
    }
    async getAllCertifications() {
        return this.certificationRepository.find({ relations: ['company',] });
    }
    async deleteCertification(id) {
        const result = await this.certificationRepository.delete(id);
        return result.affected > 0;
    }
    async inviteTeamMember(inviterId, input) {
        const inviter = await this.userRepository.findOne({
            where: { id: inviterId },
            relations: ['company']
        });
        if (!inviter) {
            throw new common_1.NotFoundException('Inviter not found');
        }
        const existingUser = await this.userRepository.findOne({
            where: { email: input.email }
        });
        console.log("---------");
        console.log(existingUser);
        if (existingUser) {
            console.log(existingUser, input);
            throw new common_1.BadRequestException('User with this email already exists');
        }
        if (input.password !== input.confirmPassword) {
            throw new common_1.BadRequestException('Passwords do not match');
        }
        if (input.password.length < 8) {
            throw new common_1.BadRequestException('Password must be at least 8 characters long');
        }
        const newUser = this.userRepository.create({
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            JobRole: input.JobRole,
            company: inviter.company,
            password: input.password
        });
        const savedUser = await this.userRepository.save(newUser);
        return savedUser;
    }
    async assignUserToCompany(userId, companyId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const company = await this.companyRepository.findOne({ where: { id: companyId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (!company) {
            throw new common_1.NotFoundException('Company not found');
        }
        user.company = company;
        return this.userRepository.save(user);
    }
    async getUsersByCompany(companyId) {
        const company = await this.companyRepository.findOne({
            where: { id: companyId },
            relations: ['users'],
        });
        if (!company) {
            throw new common_1.NotFoundException('Company not found');
        }
        return company.users;
    }
    async setupPassword(userId, password, confirmPassword) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error("User ${userId} not found");
        }
        if (password != confirmPassword) {
            throw new Error("Password and confirm Password are not matching");
        }
        user.password = password;
        return await this.userRepository.save(user);
    }
    generateOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    async generateAndSendOtp(otpRequest) {
        const otp = this.generateOtp();
        const user = await this.userRepository.findOne({ where: { email: otpRequest.email } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.otp = otp;
        await this.userRepository.save(user);
        try {
            await this.sendEmail(otpRequest.email, 'Your One-Time Password', `
      <div style="font-family: Arial, sans-serif;">
        <h2>Your One-Time Password</h2>
        <p>Your one-time password is: <strong>${otp}</strong></p>
        <p>Please use this code to verify your identity.</p>
      </div>
    `);
        }
        catch (error) {
            console.error('Failed to send OTP email:', error);
            throw error;
        }
        return otp;
    }
    async sendEmail(to, subject, body) {
        const params = {
            Source: 'noreply@exacodel.com',
            Destination: {
                ToAddresses: [to],
            },
            Message: {
                Subject: {
                    Data: subject,
                },
                Body: {
                    Html: {
                        Data: body,
                    },
                },
            },
        };
        try {
            await this.ses.send(new client_ses_1.SendEmailCommand(params));
        }
        catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
    async verifyotp(email, otp) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.otp != otp) {
            throw new Error("Otp is incorrect");
        }
        return true;
    }
    async getTeamMembers(companyId) {
        try {
            const company = await this.companyRepository.findOne({
                where: { id: companyId },
                relations: ['users']
            });
            if (!company) {
                throw new common_1.NotFoundException(`Company with ID ${companyId} not found`);
            }
            return company.users;
        }
        catch (error) {
            console.error('Error getting team members:', error);
            throw error;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(location_entity_1.Location)),
    __param(1, (0, typeorm_1.InjectRepository)(certification_entity_1.Certification)),
    __param(2, (0, typeorm_1.InjectRepository)(profile_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(teaminvite_entity_1.Invitation)),
    __param(4, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map