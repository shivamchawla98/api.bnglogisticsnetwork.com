import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserStatusField1706985370000 implements MigrationInterface {
    name = 'AddUserStatusField1706985370000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create enum type for user_status if it doesn't exist
        await queryRunner.query(`DO $$ BEGIN
            CREATE TYPE "public"."user_status_enum" AS ENUM('active', 'inactive', 'blocked', 'pending');
        EXCEPTION
            WHEN duplicate_object THEN null;
        END $$;`);
        
        // Create users table if it doesn't exist
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "users" (
                "id" SERIAL PRIMARY KEY,
                "email" character varying NOT NULL UNIQUE,
                "password" character varying NOT NULL,
                "firstName" character varying,
                "lastName" character varying,
                "phone" character varying,
                "jobRole" character varying,
                "timezone" character varying,
                "LinkedinProfile" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);
        
        // Add status column with default value 'active'
        await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "status" "public"."user_status_enum" NOT NULL DEFAULT 'active'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "status"`);
        await queryRunner.query(`DROP TYPE IF EXISTS "public"."user_status_enum"`);
    }
}
