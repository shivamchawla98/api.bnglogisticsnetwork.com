import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { UserModule } from '../user/user.module';
import { CompanyLocation } from './location.entity';
import { CompanyService as CompanyServiceEntity } from './service.entity';
import { Certification } from '../user/entity/certification.entity';
import { Management } from './entities/management.entity';
import { ManagementResolver } from './management.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company,
      CompanyLocation,
      CompanyServiceEntity,
      Certification,
      Management
    ]),
    UserModule,
  ],
  providers: [CompanyResolver, CompanyService, ManagementResolver],
  exports: [CompanyService],
})
export class CompanyModule {}
