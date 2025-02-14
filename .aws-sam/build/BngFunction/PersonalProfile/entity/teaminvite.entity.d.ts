import { JobRole } from 'src/enums/job-profile.enums';
import { Team } from './team.entity';
export declare class Invitation {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    jobRole: JobRole | null;
    contactRole: string;
    accepted: boolean;
    team: Team;
    token: string;
}
