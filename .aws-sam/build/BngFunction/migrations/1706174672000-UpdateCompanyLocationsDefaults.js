"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCompanyLocationsDefaults1706174672000 = void 0;
class UpdateCompanyLocationsDefaults1706174672000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "company_locations" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company_locations" ALTER COLUMN "country" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company_locations" ALTER COLUMN "address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company_locations" ALTER COLUMN "contacts" DROP NOT NULL`);
        await queryRunner.query(`UPDATE "company_locations" SET "contacts" = '[]' WHERE "contacts" IS NULL`);
        await queryRunner.query(`UPDATE "company_locations" SET "status" = 'active' WHERE "status" IS NULL`);
        await queryRunner.query(`UPDATE "company_locations" SET "city" = '' WHERE "city" IS NULL`);
        await queryRunner.query(`UPDATE "company_locations" SET "country" = '' WHERE "country" IS NULL`);
        await queryRunner.query(`UPDATE "company_locations" SET "address" = '' WHERE "address" IS NULL`);
        await queryRunner.query(`ALTER TABLE "company_locations" ALTER COLUMN "contacts" SET DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "company_locations" ALTER COLUMN "status" SET DEFAULT 'active'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "company_locations" ALTER COLUMN "contacts" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "company_locations" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "company_locations" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company_locations" ALTER COLUMN "country" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company_locations" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company_locations" ALTER COLUMN "contacts" SET NOT NULL`);
    }
}
exports.UpdateCompanyLocationsDefaults1706174672000 = UpdateCompanyLocationsDefaults1706174672000;
//# sourceMappingURL=1706174672000-UpdateCompanyLocationsDefaults.js.map