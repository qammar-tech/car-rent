import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAdminUsersTable1714169709660 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'admin_users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            unsigned: true,
            generationStrategy: 'increment',
          },
          {
            name: 'admin_id',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'user_id',
            type: 'int',
            unsigned: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('admin_users');
  }
}
