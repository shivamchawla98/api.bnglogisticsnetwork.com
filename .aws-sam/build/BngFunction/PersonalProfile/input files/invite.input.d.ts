import { JobRole } from 'src/enums/job-profile.enums';
import { location } from 'src/enums/location.enums';
export declare class InviteMemberInput {
    firstName: string;
    lastName: string;
    email: string;
    job: JobRole;
    location: location[];
    canMangaTeam: boolean;
}
