"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveUserLocation1706280767000 = void 0;
class RemoveUserLocation1706280767000 {
    constructor() {
        this.name = 'RemoveUserLocation1706280767000';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "location"`);
        await queryRunner.query(`DROP TYPE IF EXISTS "public"."user_location_enum"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."user_location_enum" AS ENUM ()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "location" "public"."user_location_enum" array`);
    }
}
exports.RemoveUserLocation1706280767000 = RemoveUserLocation1706280767000;
//# sourceMappingURL=1706280767000-RemoveUserLocation.js.map