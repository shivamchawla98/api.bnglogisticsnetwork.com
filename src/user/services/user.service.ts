import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from '../input files/create-user.input';
import { UpdateUserInput } from '../input files/update-user.input';
import { ResetPasswordInput } from '../input files/reset-password.input';
import { Invitation } from '../entity/teaminvite.entity';
import { Location } from '../entity/location.entity';
import { CreateLocationInput } from '../input files/create-location.input';
import { UpdateLocationInput } from '../input files/update-location.input';
import { Certification } from '../entity/certification.entity';
import { CreateCertificationInput } from '../input files/create-certification.input';
import { UpdateCertificationInput } from '../input files/update-certification.input';
import { User } from '../entity/profile.entity';
import { UserAdditionalInfo } from '../entity/user-additional-info.entity';
import { InviteMemberInput } from '../input files/invite.input';
import { invitationTeamMember } from 'src/enums/invite-status.enums';
import { InviteTeamMemberInput } from '../input files/team-member.input';
// import { location } from '../../graphql';
import { Company } from '../../company/entities/company.entity';
import * as jwt from 'jsonwebtoken';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

interface OtpRequest {
  email: string;
}

interface OtpResponse {
  otp: string;
}
@Injectable()
export class UserService {
  private readonly ses: SESClient;
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Certification)
    private certificationRepository: Repository<Certification>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Invitation)
    private invitationRepository: Repository<Invitation>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    
  )
  
   {
    this.ses = new SESClient({ region: 'ap-south-1' });
   
    // this.ses = new SES({
    //   region: 'us-east-1',
    //   accessKeyId:
    // })
   }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    console.log('Creating user with input:', JSON.stringify(createUserInput, null, 2));
    
    const { password, email, phone } = createUserInput;

    if (!password) {
      throw new BadRequestException('Password is required');
    }

    // Check for existing email
    const existingEmail = await this.userRepository.findOne({ where: { email } });
    if (existingEmail) {
      throw new BadRequestException('Email already registered');
    }

    // Check for existing phone if provided
    if (phone) {
      const existingPhone = await this.userRepository.findOne({ where: { phone } });
      if (existingPhone) {
        throw new BadRequestException('Phone number already registered');
      }
    }

    try {
      // Store password directly
      const hashedPassword = password;

      const newUser = this.userRepository.create({
        ...createUserInput,
        password: hashedPassword,
      });
      
      console.log('Saving user...');
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new BadRequestException(`Failed to create user: ${error.message}`);
    }
  }


  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async findUserByEmail(email: string): Promise<User> {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    
    try {
      const user = await this.userRepository.findOne({ 
        where: { email },
        relations: ['company']  // Load the company relation
      });
      if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error finding user: ${error.message}`);
    }
  }

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOne({ 
      where: { id },
      relations: ['company']
    });
  }

  async updateUser(updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findOne({ 
      where: { id: updateUserInput.id },
      relations: ['additionalInfo']
    });
  
    if (!user) {
      throw new NotFoundException(`User with ID ${updateUserInput.id} not found`);
    }
  
    // Update scalar fields
    if (updateUserInput.email) user.email = updateUserInput.email;
    if (updateUserInput.phone) user.phone = updateUserInput.phone;
    if (updateUserInput.JobRole) user.JobRole = updateUserInput.JobRole;
    
    // Handle additional info
    // if (updateUserInput.additionalInfo) {
    //   if (!user.additionalInfo) {
    //     user.additionalInfo = new UserAdditionalInfo();
    //   }
    //   Object.assign(user.additionalInfo, updateUserInput.additionalInfo);
    // }
  
    // Save the updated user
    const savedUser = await this.userRepository.save(user);
    
    // Return fresh data
    return await this.userRepository.findOne({ 
      where: { id: savedUser.id },
      relations: ['additionalInfo']
    });
  }
  

  async deleteUser(id: number): Promise<boolean> {
    // First, find the user
    const user = await this.userRepository.findOne({
      where: { id }
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return await this.userRepository.manager.transaction(async (transactionalEntityManager) => {
      try {
        const result = await transactionalEntityManager.delete(User, id);
        return result.affected > 0;
      } catch (error) {
        throw new BadRequestException(`Failed to delete user. Error: ${error.message}`);
      }
    });
  }
  async resetPassword(userId: number, resetPasswordInput: ResetPasswordInput): Promise<User> {
    try {
      const { oldPassword, newPassword, confirmPassword } = resetPasswordInput;

      if (newPassword !== confirmPassword) {
        throw new BadRequestException({
          code: 'PASSWORD_MISMATCH',
          message: 'New password and confirm password do not match.'
        });
      }

      const user = await this.userRepository.findOne({ where: { id: userId } });

      if (!user) {
        throw new NotFoundException({
          code: 'USER_NOT_FOUND',
          message: `User with ID ${userId} not found`
        });
      }

      console.log(oldPassword, user.password);

        // Direct password comparison
        const isPasswordValid = user.password === oldPassword;
      
        if (!isPasswordValid) {
          throw new BadRequestException({
            code: 'INVALID_OLD_PASSWORD',
            message: 'The current password you entered is incorrect.'
          });
        }

      // Store new password directly
      const hashedPassword = newPassword;
      user.password = hashedPassword;

      return await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      
      console.error('Password reset error:', error);
      throw new BadRequestException({
        code: 'PASSWORD_RESET_FAILED',
        message: 'Failed to reset password. Please try again later.'
      });
    }
  }

  
  // async createLocation(createLocationInput: CreateLocationInput, companyId: number, userId: number): Promise<Location> {
  //   const company = await this.companyRepository.findOne({where:{id:companyId}});
  //   if (!company) {
  //     throw new NotFoundException('Company not found');
  //   }

   

  //   const newLocation = this.locationRepository.create({ ...createLocationInput, company});
  //   return this.locationRepository.save(newLocation);
  // }

  async updateLocation(id: number, updateLocationInput: UpdateLocationInput): Promise<Location> {
    const location = await this.locationRepository.preload({
      id,
      ...updateLocationInput,
    });
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    return this.locationRepository.save(location);
  }

  async getLocationById(id: number): Promise<Location> {
    const location = await this.locationRepository.findOne({where:{id}, relations: ['company',] });
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    return location;
  }

  async getAllLocations(): Promise<Location[]> {
    return this.locationRepository.find({ relations: ['company', ] });
  }

  async deleteLocation(id: number): Promise<boolean> {
    const result = await this.locationRepository.delete(id);
    return result.affected > 0;
  }
  // async createCertification(createCertificationInput: CreateCertificationInput, companyId: number, userId: number): Promise<Certification> {
  //   const company = await this.companyRepository.findOne({where:{id:companyId}});
  //   if (!company) {
  //     throw new NotFoundException('Company not found');
  //   }

   
  //   const newCertification = this.certificationRepository.create({ ...createCertificationInput, company });
  //   return this.certificationRepository.save(newCertification);
  // }

  async updateCertification(id: number, updateCertificationInput: UpdateCertificationInput): Promise<Certification> {
    const certification = await this.certificationRepository.preload({
      id,
      ...updateCertificationInput,
    });
    if (!certification) {
      throw new NotFoundException('Certification not found');
    }
    return this.certificationRepository.save(certification);
  }

  async getCertificationById(id: number): Promise<Certification> {
    const certification = await this.certificationRepository.findOne({where:{id}, relations: ['company'] });
    if (!certification) {
      throw new NotFoundException('Certification not found');
    }
    return certification;
  }

  async getAllCertifications(): Promise<Certification[]> {
    return this.certificationRepository.find({ relations: ['company', ] });
  }

  async deleteCertification(id: number): Promise<boolean> {
    const result = await this.certificationRepository.delete(id);
    return result.affected > 0;
  }

async inviteTeamMember(inviterId: number, input: CreateUserInput): Promise<User> {
  const inviter = await this.userRepository.findOne({
    where: { id: inviterId },
    relations: ['company']
  });

  if (!inviter) {
    throw new NotFoundException('Inviter not found');
  }

  // console.log("Inviter:", inviter)
  // console.log("Input:", input)

  const existingUser = await this.userRepository.findOne({
    where: { email: input.email }
  });

  // console.log("---------");
  // console.log(existingUser)

  if (existingUser) {
    console.log(existingUser, input)
    throw new BadRequestException('User with this email already exists');
  }

  // Validate passwords match
  // if (input.password !== input.confirmPassword) {
  //   throw new BadRequestException('Passwords do not match');
  // }

  // Validate password strength
  if (input.password.length < 8) {
    throw new BadRequestException('Password must be at least 8 characters long');
  }

  console.log(input);
  console.log("----- input above -----");

  const newUser = this.userRepository.create({
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    JobRole: input.jobRole,
    company: inviter.company,
    password: input.password,
    phone: input.phone,
    whatsapp: input.whatsapp,
    LinkedinProfile: input.LinkedinProfile,
  });

  // newUser.status = invitationTeamMember.pending;
  const savedUser = await this.userRepository.save(newUser);

  return savedUser;
}

async assignUserToCompany(userId: number, companyId: number): Promise<User> {
  const user = await this.userRepository.findOne({ where: { id: userId } });
  const company = await this.companyRepository.findOne({ where: { id: companyId } });

  if (!user) {
    throw new NotFoundException('User not found');
  }
  if (!company) {
    throw new NotFoundException('Company not found');
  }

  user.company = company;
  return this.userRepository.save(user);
}

async getUsersByCompany(companyId: number): Promise<User[]> {
  const company = await this.companyRepository.findOne({
    where: { id: companyId },
    relations: ['users'],
  });

  if (!company) {
    throw new NotFoundException('Company not found');
  }

  return company.users;
}

async setupPassword(userId:number, password:string,confirmPassword:string): Promise<User>{
  const user = await this.userRepository.findOne({where:{id:userId}})
  if (!user){
    throw new Error("User ${userId} not found")
  }
  if(password!=confirmPassword){
    throw new Error("Password and confirm Password are not matching")
  }
  user.password = password
  return await this.userRepository.save(user);
}

private generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async generateAndSendOtp(otpRequest: OtpRequest,): Promise<string> {
  const otp = this.generateOtp();
  const user = await this.userRepository.findOne({ where: { email: otpRequest.email } });
  if (!user) {
    throw new NotFoundException('User not found');
  }
  user.otp = otp;
  await this.userRepository.save(user);

  try {
    await this.sendEmail(otpRequest.email, 'Your One-Time Password', `
      <div style="font-family: Arial, sans-serif;">
        <h2>Your One-Time Password</h2>
        <p>Your one-time password is: <strong>${otp}</strong></p>
        <p>Please use this code to verify your identity.</p>
      </div>
    `);
  } catch (error) {
    console.error('Failed to send OTP email:', error);
    throw error;
  }

  return otp ;
}

async sendEmail(to: string, subject: string, body: string) {
  const params = {
    Source: 'noreply@exacodel.com',
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Html: {
          Data: body,
        },
      },
    },
  };

  try {
    await this.ses.send(new SendEmailCommand(params));
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

async verifyotp(email:string,otp:string):Promise<boolean>{
  const user = await this.userRepository.findOne({ where: { email } });

  if (!user) {
    throw new NotFoundException('User not found');
  }
  if(user.otp!=otp){
    throw new Error("Otp is incorrect")
  }
  return true;
}

async getTeamMembers(companyId: number): Promise<User[]> {
  try {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
      relations: ['users']
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    // Return users with accepted status 
    return company.users
      // .filter(user => user.status === invitationTeamMember.accepted)
      ;
  } catch (error) {
    console.error('Error getting team members:', error);
    throw error;
  }
}

}
