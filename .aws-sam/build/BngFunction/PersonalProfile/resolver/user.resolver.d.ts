import { UserService } from '../services/user.service';
import { User } from '../entity/profile.entity';
import { CreateUserInput } from '../input files/create-user.input';
import { UpdateUserInput } from '../input files/update-user.input';
import { InviteTeamMemberInput } from '../input files/team-member.input';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    createUser(createUserInput: CreateUserInput): Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): Promise<User>;
    deleteUser(id: number): Promise<boolean>;
    inviteUser(id: number, input: InviteTeamMemberInput): Promise<User>;
    getUsersByCompany(companyId: number): Promise<User[]>;
    assignUserToCompany(userId: number, companyId: number): Promise<User>;
    setupPassword(userId: number, Password: string, confirmPassword: string): Promise<User>;
    generateOtp(email: string): Promise<string>;
    verifyOtp(email: string, otp: string): Promise<boolean>;
    getTeamMembers(companyId: number): Promise<User[]>;
}
