import { JobRole } from 'src/enums/job-profile.enums';
import { Timezone } from 'src/enums/timezone.enums';
import { CreateUserAdditionalInfoInput } from './user-additional-info.input';
export declare class UpdateUserInput {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    JobRole: JobRole;
    timezone?: Timezone;
    additionalInfo?: CreateUserAdditionalInfoInput;
}
