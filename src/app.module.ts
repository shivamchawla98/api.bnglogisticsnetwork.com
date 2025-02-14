import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { User } from './user/entity/profile.entity';
import { Company } from './company/entities/company.entity';
import { JwtBlacklist } from './auth/jwt-blacklist.entity';
import { Payment } from './user/entity/payment.entity';
import { Subscription } from './user/entity/subscription.entity';
import { Invoice } from './user/entity/invoice.entity';
import { Plan } from './user/entity/plan.entity';
import { Location } from './user/entity/location.entity';
import { Certification } from './user/entity/certification.entity';
import { Invitation } from './user/entity/teaminvite.entity';
import { Team } from './user/entity/team.entity';
import { CompanyLocation } from './company/location.entity';
import { CompanyService } from './company/service.entity';
import { UserAdditionalInfo } from './user/entity/user-additional-info.entity';
import { InviteCodeModule } from './invite-code/invite-code.module';
import { InviteCode } from './invite-code/invite-code.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

const entities = [
  User,
  Company,
  JwtBlacklist,
  Payment,
  Subscription,
  // Invoice,
  // Plan,
  Location,
  Certification,
  Team,
  // Invitation,
  CompanyLocation,
  CompanyService,
  // UserAdditionalInfo,
  InviteCode,
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: entities,
      synchronize: true, // Disable auto-sync since we're using migrations
      // logging: true,
      migrationsRun: false,
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      autoLoadEntities: true,
      cache: false,
      retryAttempts: 3,
      retryDelay: 1000,
      keepConnectionAlive: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.graphql',
      sortSchema: true,
      path: '/graphql',
      playground: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    AuthModule,
    UserModule,
    CompanyModule,
    InviteCodeModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule {}
