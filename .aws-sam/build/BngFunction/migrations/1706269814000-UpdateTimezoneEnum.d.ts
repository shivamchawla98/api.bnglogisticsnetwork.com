import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UpdateTimezoneEnum1706269814000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
