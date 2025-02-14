import { JobRole } from "src/enums/job-profile.enums";
import { location } from "src/enums/location.enums";
export declare class InviteTeamMemberInput {
    email: string;
    JobRole: JobRole;
    location: location[];
    firstName: string;
    lastName: string;
    canManageTeam: boolean;
    password: string;
    confirmPassword: string;
}
