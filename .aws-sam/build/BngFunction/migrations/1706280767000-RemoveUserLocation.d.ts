import { MigrationInterface, QueryRunner } from "typeorm";
export declare class RemoveUserLocation1706280767000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
