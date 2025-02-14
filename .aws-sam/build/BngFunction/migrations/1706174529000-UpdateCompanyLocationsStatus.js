"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCompanyLocationsStatus1706174529000 = void 0;
class UpdateCompanyLocationsStatus1706174529000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "company_locations" ALTER COLUMN "status" DROP NOT NULL`);
        await queryRunner.query(`UPDATE "company_locations" SET "status" = 'active' WHERE "status" IS NULL`);
        await queryRunner.query(`ALTER TABLE "company_locations" ALTER COLUMN "status" SET DEFAULT 'active'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "company_locations" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "company_locations" ALTER COLUMN "status" SET NOT NULL`);
    }
}
exports.UpdateCompanyLocationsStatus1706174529000 = UpdateCompanyLocationsStatus1706174529000;
//# sourceMappingURL=1706174529000-UpdateCompanyLocationsStatus.js.map