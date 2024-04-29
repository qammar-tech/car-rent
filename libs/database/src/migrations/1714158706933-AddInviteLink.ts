import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddInviteLink1714158706933 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'invite_link',
        type: 'varchar',
        length: '1000',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'invite_link');
  }
}
