import { Repository } from 'typeorm';
import { InviteCode } from './invite-code.entity';
export declare class InviteCodeService {
    private inviteCodeRepository;
    private readonly logger;
    constructor(inviteCodeRepository: Repository<InviteCode>);
    validateInviteCode(code: string): Promise<boolean>;
    useInviteCode(code: string, userId: string): Promise<void>;
    generateInviteCodes(count?: number): Promise<string[]>;
}
