import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin_users')
export class AdminUsers {
  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'int', nullable: false })
  adminId: number;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'int', nullable: false })
  userId: number;
}
