import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TaskStatus } from '@app/tasks/tasks.types';

export class UpdateTaskDto {
  @ApiProperty({ example: 'John Bucks', required: true })
  @IsString()
  @MaxLength(128)
  @IsOptional()
  name: string;

  @ApiProperty({ example: 'Task Description', required: true })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    example: TaskStatus.Created,
    required: false,
    default: TaskStatus.Created,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
