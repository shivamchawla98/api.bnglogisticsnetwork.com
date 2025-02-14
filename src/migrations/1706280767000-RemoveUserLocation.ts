import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUserLocation1706280767000 implements MigrationInterface {
    name = 'RemoveUserLocation1706280767000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // First drop the column
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "location"`);
        
        // Then drop the enum type
        await queryRunner.query(`DROP TYPE IF EXISTS "public"."user_location_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Recreate the enum type
        await queryRunner.query(`CREATE TYPE "public"."user_location_enum" AS ENUM ()`);
        
        // Add back the column
        await queryRunner.query(`ALTER TABLE "user" ADD "location" "public"."user_location_enum" array`);
    }
}
