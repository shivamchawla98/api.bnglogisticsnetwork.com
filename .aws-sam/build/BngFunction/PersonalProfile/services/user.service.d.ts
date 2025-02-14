import { Repository } from 'typeorm';
import { CreateUserInput } from '../input files/create-user.input';
import { UpdateUserInput } from '../input files/update-user.input';
import { ResetPasswordInput } from '../input files/reset-password.input';
import { Invitation } from '../entity/teaminvite.entity';
import { Location } from '../entity/location.entity';
import { UpdateLocationInput } from '../input files/update-location.input';
import { Certification } from '../entity/certification.entity';
import { UpdateCertificationInput } from '../input files/update-certification.input';
import { User } from '../entity/profile.entity';
import { InviteTeamMemberInput } from '../input files/team-member.input';
import { Company } from '../../company/company.entity';
interface OtpRequest {
    email: string;
}
export declare class UserService {
    private locationRepository;
    private certificationRepository;
    private userRepository;
    private invitationRepository;
    private companyRepository;
    private readonly ses;
    constructor(locationRepository: Repository<Location>, certificationRepository: Repository<Certification>, userRepository: Repository<User>, invitationRepository: Repository<Invitation>, companyRepository: Repository<Company>);
    createUser(createUserInput: CreateUserInput): Promise<User>;
    getAllUsers(): Promise<User[]>;
    findUserByEmail(email: string): Promise<User>;
    getUserById(id: number): Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): Promise<User>;
    deleteUser(id: number): Promise<boolean>;
    resetPassword(userId: number, resetPasswordInput: ResetPasswordInput): Promise<User>;
    updateLocation(id: number, updateLocationInput: UpdateLocationInput): Promise<Location>;
    getLocationById(id: number): Promise<Location>;
    getAllLocations(): Promise<Location[]>;
    deleteLocation(id: number): Promise<boolean>;
    updateCertification(id: number, updateCertificationInput: UpdateCertificationInput): Promise<Certification>;
    getCertificationById(id: number): Promise<Certification>;
    getAllCertifications(): Promise<Certification[]>;
    deleteCertification(id: number): Promise<boolean>;
    inviteTeamMember(inviterId: number, input: InviteTeamMemberInput): Promise<User>;
    assignUserToCompany(userId: number, companyId: number): Promise<User>;
    getUsersByCompany(companyId: number): Promise<User[]>;
    setupPassword(userId: number, password: string, confirmPassword: string): Promise<User>;
    private generateOtp;
    generateAndSendOtp(otpRequest: OtpRequest): Promise<string>;
    sendEmail(to: string, subject: string, body: string): Promise<void>;
    verifyotp(email: string, otp: string): Promise<boolean>;
    getTeamMembers(companyId: number): Promise<User[]>;
}
export {};
