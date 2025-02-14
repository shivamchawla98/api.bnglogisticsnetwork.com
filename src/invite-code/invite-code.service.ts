import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InviteCode } from './invite-code.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-writer';

@Injectable()
export class InviteCodeService {
  private readonly logger = new Logger(InviteCodeService.name);

  constructor(
    @InjectRepository(InviteCode)
    private inviteCodeRepository: Repository<InviteCode>,
  ) {}

  async validateInviteCode(code: string): Promise<boolean> {
    this.logger.debug(`Validating invite code: ${code}`);
    
    if (!code) {
      this.logger.debug('No invite code provided');
      return false;
    }

    try {
      const inviteCode = await this.inviteCodeRepository.findOne({
        where: { code, isUsed: false },
      });

      if (!inviteCode) {
        this.logger.debug(`Invalid or used invite code: ${code}`);
        return false;
      }

      this.logger.debug(`Valid invite code found: ${code}`);
      return true;
    } catch (error) {
      this.logger.error(`Error validating invite code: ${error.message}`);
      return false;
    }
  }

  async useInviteCode(code: string, userId: string): Promise<void> {
    this.logger.debug(`Attempting to use invite code: ${code} for user: ${userId}`);
    
    const inviteCode = await this.inviteCodeRepository.findOne({
      where: { code, isUsed: false },
    });

    if (!inviteCode) {
      this.logger.error(`Invalid or already used invite code: ${code}`);
      throw new NotFoundException('Invalid or already used invite code');
    }

    try {
      inviteCode.isUsed = true;
      inviteCode.usedById = userId;
      await this.inviteCodeRepository.save(inviteCode);
      this.logger.debug(`Successfully used invite code: ${code}`);
    } catch (error) {
      this.logger.error(`Error using invite code: ${error.message}`);
      throw error;
    }
  }

  async generateInviteCodes(count: number = 100): Promise<string[]> {
    const codes: string[] = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    
    while (codes.length < count) {
      let code = 'BNG';
      // Add 4 random characters
      for (let i = 0; i < 4; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      code += 'INVT';
      
      // Check if code already exists
      const exists = await this.inviteCodeRepository.findOne({ where: { code } });
      if (!exists && !codes.includes(code)) {
        codes.push(code);
      }
    }

    // Save codes to database
    const inviteCodes = codes.map(code => this.inviteCodeRepository.create({ code }));
    await this.inviteCodeRepository.save(inviteCodes);

    // Generate CSV file
    const csvWriter = csv.createObjectCsvWriter({
      path: path.join(process.cwd(), 'invite-codes.csv'),
      header: [
        { id: 'code', title: 'INVITE_CODE' },
      ]
    });

    await csvWriter.writeRecords(codes.map(code => ({ code })));

    return codes;
  }
}
