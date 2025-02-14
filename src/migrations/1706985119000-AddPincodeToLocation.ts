import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPincodeToLocation1706985119000 implements MigrationInterface {
    name = 'AddPincodeToLocation1706985119000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_locations" ADD COLUMN IF NOT EXISTS "pincode" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_locations" DROP COLUMN IF EXISTS "pincode"`);
    }
}
