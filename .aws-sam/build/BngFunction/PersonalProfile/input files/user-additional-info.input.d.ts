import { ContactType } from 'src/enums/contact-type.enums';
export declare class CreateUserAdditionalInfoInput {
    contactType: ContactType[] | null;
    contactSpecification: string | null;
    email: string | null;
    phoneno: string | null;
    whatsapp: boolean;
    msg: boolean;
}
