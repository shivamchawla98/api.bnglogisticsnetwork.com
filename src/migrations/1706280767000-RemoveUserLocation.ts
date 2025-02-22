import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUserLocation1706280767000 implements MigrationInterface {
    name = 'RemoveUserLocation1706280767000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Check if the column exists before trying to drop it
        const hasLocationColumn = await queryRunner.hasColumn("user", "location");
        if (hasLocationColumn) {
            await queryRunner.dropColumn("user", "location");
        }
        
        // Then drop the enum type
        await queryRunner.query(`DROP TYPE IF EXISTS "public"."user_location_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Recreate the enum type
        await queryRunner.query(`CREATE TYPE "public"."user_location_enum" AS ENUM ()`);
        
        // Add the column back only if it doesn't exist
        const hasLocationColumn = await queryRunner.hasColumn("user", "location");
        if (!hasLocationColumn) {
            await queryRunner.query(`ALTER TABLE "user" ADD "location" "public"."user_location_enum" array`);
        }
    }
}
