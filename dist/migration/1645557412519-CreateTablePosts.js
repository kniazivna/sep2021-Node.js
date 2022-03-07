"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTablePosts1645557412519 = void 0;
const typeorm_1 = require("typeorm");
class CreateTablePosts1645557412519 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'Posts',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'title',
                    type: 'varchar',
                    width: 250,
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'text',
                    type: 'varchar',
                    width: 250,
                    isNullable: false,
                },
                {
                    name: 'userId',
                    type: 'int',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'now()',
                },
                {
                    name: 'deletedAt',
                    type: 'timestamp',
                    isNullable: false,
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['userId'],
                    referencedTableName: 'Users',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('Posts', true);
    }
}
exports.CreateTablePosts1645557412519 = CreateTablePosts1645557412519;
//# sourceMappingURL=1645557412519-CreateTablePosts.js.map