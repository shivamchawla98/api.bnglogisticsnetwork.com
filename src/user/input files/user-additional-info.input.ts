import { InputType, Field } from '@nestjs/graphql';
import { ContactType } from 'src/enums/contact-type.enums'; // Adjust the path if necessary

@InputType()
export class CreateUserAdditionalInfoInput {
  @Field(() => [ContactType], { nullable: true })
  contactType: ContactType[] | null;

  @Field({ nullable: true })
  contactSpecification: string | null;

  @Field({ nullable: true })
  email: string | null;

  @Field({ nullable: true })
  phoneno: string | null;

  @Field({ defaultValue: false })
  whatsapp: boolean;

  @Field({ defaultValue: false })
  msg: boolean;
}
