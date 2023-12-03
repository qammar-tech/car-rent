import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { CursorFilterDto } from '@app/common/pagination/cursor-filter.dto';
import { ValidateHelper } from '@app/common/helpers/validate.helper';
import { Sensors } from '@app/sensors/sensors.entity';

export class SensorsFilterDto extends CursorFilterDto {
  @ApiProperty({ example: 'adam', required: false })
  @Transform(({ value }) => ValidateHelper.sanitize(value))
  @IsOptional()
  @IsString()
  searchText: string;

  @ApiProperty({ example: 'createdAt', enum: ['createdAt'], required: false })
  @IsOptional()
  @IsIn(['createdAt'])
  orderParam: keyof Sensors = 'createdAt';
}
