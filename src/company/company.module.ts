import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { Company } from './entities/company.entity';
import { User } from '../user/entity/profile.entity';
import { CompanyLocation } from './location.entity';
import { CompanyService as CompanyServiceEntity } from './service.entity';
import { Certification } from '../user/entity/certification.entity';
import { Management } from './entities/management.entity';
import { Specialization } from './specialization.entity';
import { ManagementResolver } from './management.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company,
      User,
      CompanyLocation,
      CompanyServiceEntity,
      Certification,
      Management,
      Specialization
    ]),
    UserModule,
  ],
  providers: [CompanyResolver, CompanyService, ManagementResolver],
  exports: [CompanyService],
})
export class CompanyModule {}
