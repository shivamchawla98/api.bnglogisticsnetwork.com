import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddSpecializationsTable1708613700000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // First remove isSpecialization column from company_services table
        await queryRunner.query(`ALTER TABLE company_services DROP COLUMN IF EXISTS "isSpecialization"`);

        // Create company_specializations table
        await queryRunner.createTable(
            new Table({
                name: "company_specializations",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "companyId",
                        type: "int",
                    },
                    {
                        name: "serviceId",
                        type: "int",
                    },
                ],
            }),
            true
        );

        // Add foreign key constraints
        await queryRunner.createForeignKey(
            "company_specializations",
            new TableForeignKey({
                columnNames: ["companyId"],
                referencedColumnNames: ["id"],
                referencedTableName: "company",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "company_specializations",
            new TableForeignKey({
                columnNames: ["serviceId"],
                referencedColumnNames: ["id"],
                referencedTableName: "company_services",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the company_specializations table
        await queryRunner.dropTable("company_specializations");

        // Add back isSpecialization column to company_services table
        await queryRunner.query(`ALTER TABLE company_services ADD COLUMN "isSpecialization" boolean DEFAULT false`);
    }
}
