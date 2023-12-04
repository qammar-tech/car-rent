import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('payments')
export class Payments {
  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({
    description: `Unique uuid`,
    maximum: 36,
    example: '28',
  })
  @Column({ type: 'int', nullable: true })
  groupId: number;

  @ApiProperty({
    description: `Unique uuid`,
    maximum: 36,
    example: '28',
  })
  @Column({ type: 'int', nullable: true })
  userId: number;

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
}
