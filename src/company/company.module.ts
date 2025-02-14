import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { UserModule } from '../user/user.module';
import { CompanyLocation } from './location.entity';
import { CompanyService as CompanyServiceEntity } from './service.entity';
import { Certification } from '../user/entity/certification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, CompanyLocation, CompanyServiceEntity, Certification]),
    UserModule,
  ],
  providers: [CompanyResolver, CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
