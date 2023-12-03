import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCreditsToUser1701632556007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'credits',
        type: 'varchar',
        length: '66',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'credits');
  }
}
