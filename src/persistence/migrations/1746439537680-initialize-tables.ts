import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitializeTables1746439537680 implements MigrationInterface {
    name = 'InitializeTables1746439537680';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "users" ("id" character varying(64) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstname" character varying, "lastname" character varying, "birthdate" TIMESTAMP, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
