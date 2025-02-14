import { User } from "./profile.entity";
import { ContactType } from '../../enums/contact-type.enums';
export declare class UserAdditionalInfo {
    id: number;
    contactType: ContactType[] | null;
    contactSpecification: string | null;
    email: string | null;
    phoneno: string | null;
    whatsapp: boolean;
    msg: boolean;
    user: User;
}
