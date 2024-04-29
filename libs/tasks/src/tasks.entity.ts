import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';
import { TaskStatus } from './tasks.types';

@Entity('tasks')
export class Tasks {
  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({
    description: `Unique uuid`,
    maximum: 36,
    example: '28',
  })
  @Column({ type: 'varchar', nullable: false, length: 36 })
  uuid: string;

  @ApiProperty({
    example: 'John Doe task',
    required: false,
    minimum: 1,
    maximum: 128,
    description: 'Full name of task',
  })
  @Column({ type: 'varchar', nullable: true, length: 128 })
  name: string;

  @ApiProperty({
    example: 'This is the description',
    required: false,
    maximum: 255,
    description: 'Description for task',
  })
  @Column({ type: 'varchar', nullable: false, length: 255 })
  description: string;

  @ApiProperty({
    description: 'Date when the user was created',
    required: true,
  })
  @Column({ type: 'datetime', nullable: false })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when user was updated the last time',
    required: false,
  })
  @Column({ type: 'datetime', nullable: true })
  updatedAt: Date;

  @Exclude({ toPlainOnly: true })
  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date;

  @ApiProperty({
    description: 'Task status',
    example: TaskStatus.Created,
    required: true,
    enum: TaskStatus,
  })
  @Column({ type: 'enum', nullable: false, enum: TaskStatus })
  status: TaskStatus;

  @Column({ type: 'int', nullable: false })
  adminId: number;

  @Column({ type: 'int', nullable: false })
  userId: number;

  // @ManyToMany(() => Admin, (admin) => admin.users)
  // @JoinTable({ name: 'admin_users' })
  // admins: Admin[];
}
