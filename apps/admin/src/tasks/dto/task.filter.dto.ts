import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CursorFilterDto } from '@app/common/pagination/cursor-filter.dto';
import { ValidateHelper } from '@app/common/helpers/validate.helper';
import { Tasks } from '@app/tasks/tasks.entity';
import { TaskStatus } from '@app/tasks/tasks.types';

export class TasksFilterDto extends CursorFilterDto {
  @ApiProperty({ example: 'adam', required: false })
  @Transform(({ value }) => ValidateHelper.sanitize(value))
  @IsOptional()
  @IsString()
  searchText: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  userId: number;

  @ApiProperty({
    example: TaskStatus.Created,
    enum: TaskStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({ example: 'createdAt', enum: ['createdAt'], required: false })
  @IsOptional()
  @IsIn(['createdAt'])
  orderParam: keyof Tasks = 'createdAt';
}
