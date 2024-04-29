import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TaskStatus } from '@app/tasks/tasks.types';

export class CreateTaskDto {
  @ApiProperty({ example: 'John Bucks', required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
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
