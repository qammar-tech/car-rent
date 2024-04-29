import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddExpiryDate1714169242326 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'invitation_expires_at',
        type: 'datetime',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'invitation_expires_at');
  }
}
