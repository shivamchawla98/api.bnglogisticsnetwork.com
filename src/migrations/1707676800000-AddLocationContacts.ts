import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class AddLocationContacts1707676800000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create location_contacts junction table
        await queryRunner.createTable(
            new Table({
                name: 'location_contacts',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'location_id',
                        type: 'int',
                    },
                    {
                        name: 'user_id',
                        type: 'int',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
            true,
        );

        // Add foreign keys
        await queryRunner.createForeignKey(
            'location_contacts',
            new TableForeignKey({
                columnNames: ['location_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'company_locations',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'location_contacts',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );

        // Add contact_roles column to company_locations
        await queryRunner.query(`
            ALTER TABLE company_locations 
            ADD COLUMN contact_roles jsonb DEFAULT '[]'::jsonb
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop contact_roles column
        await queryRunner.query(`
            ALTER TABLE company_locations 
            DROP COLUMN IF EXISTS contact_roles
        `);

        // Drop foreign keys and table
        const table = await queryRunner.getTable('location_contacts');
        if (table) {
            const foreignKeys = table.foreignKeys;
            for (const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey('location_contacts', foreignKey);
            }
        }
        await queryRunner.dropTable('location_contacts');
    }
}
