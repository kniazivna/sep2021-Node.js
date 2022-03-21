import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAccesToken1647859579738 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE Tokens ADD COLUMN accessToken VARCHAR(250) NOT NULL
             `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE Tokens DROP COLUMN accessToken
            `);
    }
}
