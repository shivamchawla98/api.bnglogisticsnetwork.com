import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserResolver } from './resolver/user.resolver';
// import { UserService } from './services/user.service';
// import { User } from './entity/profile.entity';
// import { Team } from './entity/team.entity';
// import { Invitation } from './entity/teaminvite.entity';
// import { Payment } from './entity/payment.entity';
// import { Subscription } from './entity/subscription.entity';
// import { Invoice } from './entity/invoice.entity';
// import { RazorpayService } from './services/rajorpay.service';
// import { RazorpayResolver } from './resolver/rajorpay.resolver';
// import { Plan } from './entity/plan.entity';
// import { Location } from './entity/location.entity';
// import { Certification } from './entity/certification.entity';
import { Company } from '../company/entities/company.entity';
// import { UserAdditionalInfo } from './entity/user-additional-info.entity';

// const entities = [
//   User,
//   Team,
//   // Invitation,
//   // Payment,
//   // Subscription,
//   // Invoice,
//   // Plan,
//   Location,
//   // Certification,
//   Company,
//   // UserAdditionalInfo
// ];

// @Module({
//   imports: [
//     TypeOrmModule.forFeature(entities)
//   ],
//   providers: [
//     UserService,
//     UserResolver,
//     RazorpayService,
//     RazorpayResolver,
//   ],
//   exports: [
//     UserService,
//     RazorpayService,
//     TypeOrmModule.forFeature(entities) // Export the repositories explicitly
//   ],
// })
// export class PersonalProfileModule {}
