import { JobRole } from 'src/enums/job-profile.enums';
import { Timezone } from 'src/enums/timezone.enums';
import { CreateUserAdditionalInfoInput } from './user-additional-info.input';
export declare class CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    JobRole: JobRole;
    timezone?: Timezone;
    LinkedinProfile: string;
    imageurl: string;
    additionalInfo?: CreateUserAdditionalInfoInput;
}
