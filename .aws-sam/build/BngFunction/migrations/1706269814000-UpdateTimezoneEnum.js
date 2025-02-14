"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTimezoneEnum1706269814000 = void 0;
class UpdateTimezoneEnum1706269814000 {
    constructor() {
        this.name = 'UpdateTimezoneEnum1706269814000';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            DO $$ BEGIN
                IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_timezone_enum') THEN
                    ALTER TABLE "user" ALTER COLUMN "timezone" DROP DEFAULT;
                    ALTER TABLE "user" ALTER COLUMN "timezone" TYPE VARCHAR;
                END IF;
            END $$;
        `);
        await queryRunner.query(`
            DROP TYPE IF EXISTS "user_timezone_enum";
        `);
        await queryRunner.query(`
            CREATE TYPE "user_timezone_enum" AS ENUM (
                'Asia_Calcutta', 'Asia_Kolkata', 'Asia_Bangkok', 'Asia_Colombo', 'Asia_Dhaka',
                'Asia_Dubai', 'Asia_Hong_Kong', 'Asia_Ho_Chi_Minh', 'Asia_Almaty', 'Asia_Amman',
                'Asia_Baghdad', 'Asia_Beirut', 'Asia_Jakarta', 'Asia_Jerusalem', 'Asia_Kabul',
                'Asia_Karachi', 'Asia_Singapore', 'Asia_Tokyo', 'Asia_Shanghai', 'Asia_Seoul',
                'Asia_Manila', 'Asia_Kuala_Lumpur', 'Asia_Riyadh', 'Asia_Tehran',
                'Europe_London', 'Europe_Paris', 'Europe_Berlin', 'Europe_Rome', 'Europe_Madrid',
                'Europe_Moscow', 'Europe_Istanbul', 'Europe_Amsterdam', 'Europe_Brussels',
                'Europe_Stockholm', 'Europe_Vienna', 'Europe_Warsaw',
                'America_New_York', 'America_Chicago', 'America_Los_Angeles', 'America_Toronto',
                'America_Mexico_City', 'America_Sao_Paulo', 'America_Buenos_Aires',
                'America_Vancouver', 'America_Denver', 'America_Phoenix',
                'Pacific_Auckland', 'Pacific_Sydney', 'Australia_Melbourne', 'Australia_Perth',
                'Africa_Cairo', 'Africa_Lagos', 'Africa_Johannesburg', 'Africa_Nairobi',
                'Africa_Casablanca', 'UTC'
            );
        `);
        await queryRunner.query(`
            ALTER TABLE "user" 
            ALTER COLUMN "timezone" TYPE "user_timezone_enum" 
            USING CASE 
                WHEN timezone LIKE '%Calcutta%' THEN 'Asia_Calcutta'::"user_timezone_enum"
                WHEN timezone LIKE '%Kolkata%' THEN 'Asia_Kolkata'::"user_timezone_enum"
                ELSE 'UTC'::"user_timezone_enum"
            END;
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user" ALTER COLUMN "timezone" TYPE VARCHAR;
        `);
        await queryRunner.query(`
            DROP TYPE "user_timezone_enum";
        `);
        await queryRunner.query(`
            CREATE TYPE "user_timezone_enum" AS ENUM (
                'Asia_Calcutta', 'Asia_Bangkok', 'Asia_Colombo', 'Asia_Dhaka',
                'Asia_Dubai', 'Asia_HongKong', 'Asia_Ho_Chi_Minh', 'Asia_Hovd',
                'Asia_Almaty', 'Asia_Amman', 'Asia_Baghdad', 'Asia_Bhaku',
                'Asia_Beirut', 'Asia_jakarta', 'Asia_Jerusalem', 'Asia_Kabul',
                'Asia_Karachi'
            );
        `);
        await queryRunner.query(`
            ALTER TABLE "user" 
            ALTER COLUMN "timezone" TYPE "user_timezone_enum" 
            USING CASE 
                WHEN timezone = 'Asia_Kolkata' THEN 'Asia_Calcutta'::"user_timezone_enum"
                ELSE 'Asia_Calcutta'::"user_timezone_enum"
            END;
        `);
    }
}
exports.UpdateTimezoneEnum1706269814000 = UpdateTimezoneEnum1706269814000;
//# sourceMappingURL=1706269814000-UpdateTimezoneEnum.js.map