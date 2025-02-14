import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewCompanyFields1706984848000 implements MigrationInterface {
    name = 'AddNewCompanyFields1706984848000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create enum type for company_type if it doesn't exist
        await queryRunner.query(`DO $$ BEGIN
            CREATE TYPE "public"."company_company_type_enum" AS ENUM('PRIVATE', 'PUBLIC', 'PARTNERSHIP', 'PROPRIETORSHIP', 'LLP', 'OTHER');
        EXCEPTION
            WHEN duplicate_object THEN null;
        END $$;`);
        
        // Add new fields to company table
        await queryRunner.query(`ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "legalName" character varying`);
        await queryRunner.query(`ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "companyType" "public"."company_company_type_enum"`);
        await queryRunner.query(`ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "timezone" character varying`);
        await queryRunner.query(`ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "incorporationDate" character varying`);
        await queryRunner.query(`ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "taxId" character varying`);
        await queryRunner.query(`ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "companyRegistration" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove the added fields
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN IF EXISTS "companyRegistration"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN IF EXISTS "taxId"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN IF EXISTS "incorporationDate"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN IF EXISTS "timezone"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN IF EXISTS "companyType"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN IF EXISTS "legalName"`);
        
        // Drop the enum type if it exists
        await queryRunner.query(`DROP TYPE IF EXISTS "public"."company_company_type_enum"`);
    }
}
