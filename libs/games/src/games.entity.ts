import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('games')
export class Games {
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
    description: `Unique uuid`,
    maximum: 36,
    example: '28',
  })
  @Column({ type: 'int', nullable: false })
  winnerId: number;

  @ApiProperty({
    description: `Unique uuid`,
    maximum: 36,
    example: '28',
  })
  @Column({ type: 'int', nullable: false })
  looserId: number;

  @ApiProperty({
    description: `Unique uuid`,
    maximum: 36,
    example: '28',
  })
  @Column({ type: 'int', nullable: false })
  sensorId: number;

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
