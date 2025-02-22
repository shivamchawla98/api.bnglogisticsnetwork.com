import { MigrationInterface, QueryRunner } from "typeorm";

export class MoveTimezoneToLocation1707052800000 implements MigrationInterface {
    name = 'MoveTimezoneToLocation1707052800000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Check if the column exists before trying to add it
        const hasTimezoneColumn = await queryRunner.hasColumn("location", "timezone");
        if (!hasTimezoneColumn) {
            await queryRunner.query(`ALTER TABLE "location" ADD "timezone" character varying`);
        }

        // Copy timezone data from user to their primary location if exists
        await queryRunner.query(`
            UPDATE "location" l
            SET timezone = u.timezone
            FROM "user" u
            INNER JOIN "company" c ON c.user_id = u.id
            WHERE l.company_id = c.id
            AND u.timezone IS NOT NULL
        `);

        // Drop timezone column from user table
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "timezone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Add timezone column back to user table
        await queryRunner.query(`ALTER TABLE "user" ADD "timezone" character varying`);

        // Copy timezone data back from location to user if exists
        await queryRunner.query(`
            UPDATE "user" u
            SET timezone = l.timezone
            FROM "location" l
            INNER JOIN "company" c ON c.id = l.company_id
            WHERE c.user_id = u.id
            AND l.timezone IS NOT NULL
        `);

        // Check if the column exists before trying to drop it
        const hasTimezoneColumn = await queryRunner.hasColumn("location", "timezone");
        if (hasTimezoneColumn) {
            await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "timezone"`);
        }
    }
}
