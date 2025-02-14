import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class SocialLinkInput {
  @Field()
  @IsString()
  platform: string;

  @Field()
  @IsString()
  url: string;
}
