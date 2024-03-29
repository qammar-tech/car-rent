import { UserType } from '@admin/auth/auth.types';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';
import { UserStatus } from './user.types';

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
    description: `User Credits`,
    maximum: 36,
    example: '28d1b563-eae0-4a5a-84cf-5b8f4b527411',
  })
  @Column({ type: 'varchar', nullable: true, length: 66 })
  credits: string;

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
    example: UserType.Individual,
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
}
