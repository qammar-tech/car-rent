import { UserType } from '@admin/auth/auth.types';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserStatus } from './user.types';
import { Admin } from '@admin/admin/admin.entity';

@Entity('user')
export class User {
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
    example: 'John Doe',
    required: false,
    minimum: 1,
    maximum: 128,
    description: 'Full name',
  })
  @Column({ type: 'varchar', nullable: true, length: 128 })
  name: string;

  @ApiProperty({
    example: 'user@example.com',
    required: false,
    maximum: 255,
    description: 'E-mail',
  })
  @Column({ type: 'varchar', nullable: false, length: 255 })
  email: string;

  @ApiProperty({
    example: '214231',
    required: false,
    maximum: 255,
    description: 'E-mail',
  })
  @Column({ type: 'varchar', nullable: false, length: 255 })
  password: string;

  @ApiProperty({
    description: 'User type',
    example: UserType.Admin,
    required: true,
    enum: UserType,
  })
  @Column({ type: 'enum', nullable: false, enum: UserType })
  role: UserType;

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
    description: 'User status',
    example: UserStatus.Creating,
    required: true,
    enum: UserStatus,
  })
  @Column({ type: 'enum', nullable: false, enum: UserStatus })
  status: UserStatus;

  @ApiProperty({ description: 'Token Expires until date', required: true })
  @Column({ type: 'datetime', nullable: false })
  invitationExpiresAt: Date;

  @ApiProperty({
    example: 'asbvkjhsd',
    required: false,
    minimum: 1,
    maximum: 128,
    description: 'invite link hash',
  })
  @Column({ type: 'varchar', nullable: true, length: 128 })
  inviteLink: string;

  @ManyToMany(() => Admin, (admin) => admin.users)
  @JoinTable({ name: 'admin_users' })
  admins: Admin[];
}
