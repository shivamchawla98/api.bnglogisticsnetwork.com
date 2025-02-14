import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { InviteCode } from './invite-code.entity';
import { InviteCodeService } from './invite-code.service';
import { InviteCodeResolver } from './invite-code.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InviteCode]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
  ],
  providers: [InviteCodeService, InviteCodeResolver],
  exports: [InviteCodeService],
})
export class InviteCodeModule {}
