"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var InviteCodeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteCodeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const invite_code_entity_1 = require("./invite-code.entity");
const path = require("path");
const csv = require("csv-writer");
let InviteCodeService = InviteCodeService_1 = class InviteCodeService {
    constructor(inviteCodeRepository) {
        this.inviteCodeRepository = inviteCodeRepository;
        this.logger = new common_1.Logger(InviteCodeService_1.name);
    }
    async validateInviteCode(code) {
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
        }
        catch (error) {
            this.logger.error(`Error validating invite code: ${error.message}`);
            return false;
        }
    }
    async useInviteCode(code, userId) {
        this.logger.debug(`Attempting to use invite code: ${code} for user: ${userId}`);
        const inviteCode = await this.inviteCodeRepository.findOne({
            where: { code, isUsed: false },
        });
        if (!inviteCode) {
            this.logger.error(`Invalid or already used invite code: ${code}`);
            throw new common_1.NotFoundException('Invalid or already used invite code');
        }
        try {
            inviteCode.isUsed = true;
            inviteCode.usedById = userId;
            await this.inviteCodeRepository.save(inviteCode);
            this.logger.debug(`Successfully used invite code: ${code}`);
        }
        catch (error) {
            this.logger.error(`Error using invite code: ${error.message}`);
            throw error;
        }
    }
    async generateInviteCodes(count = 100) {
        const codes = [];
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        while (codes.length < count) {
            let code = 'BNG';
            for (let i = 0; i < 4; i++) {
                code += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            code += 'INVT';
            const exists = await this.inviteCodeRepository.findOne({ where: { code } });
            if (!exists && !codes.includes(code)) {
                codes.push(code);
            }
        }
        const inviteCodes = codes.map(code => this.inviteCodeRepository.create({ code }));
        await this.inviteCodeRepository.save(inviteCodes);
        const csvWriter = csv.createObjectCsvWriter({
            path: path.join(process.cwd(), 'invite-codes.csv'),
            header: [
                { id: 'code', title: 'INVITE_CODE' },
            ]
        });
        await csvWriter.writeRecords(codes.map(code => ({ code })));
        return codes;
    }
};
exports.InviteCodeService = InviteCodeService;
exports.InviteCodeService = InviteCodeService = InviteCodeService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invite_code_entity_1.InviteCode)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InviteCodeService);
//# sourceMappingURL=invite-code.service.js.map