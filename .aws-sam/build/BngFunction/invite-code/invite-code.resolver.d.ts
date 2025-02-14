import { InviteCodeService } from './invite-code.service';
export declare class InviteCodeResolver {
    private readonly inviteCodeService;
    constructor(inviteCodeService: InviteCodeService);
    validateInviteCode(code: string): Promise<boolean>;
    generateInviteCodes(count?: number): Promise<boolean>;
}
