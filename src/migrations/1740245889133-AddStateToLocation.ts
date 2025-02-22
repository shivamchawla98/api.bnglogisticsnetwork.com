import { MigrationInterface, QueryRunner } from "typeorm"

export class AddStateToLocation1740245889133 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_locations" ADD "state" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_locations" DROP COLUMN "state"`);
    }
}
