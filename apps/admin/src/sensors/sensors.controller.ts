import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SensorsService } from './sensors.service';
import { PagingResult } from 'typeorm-cursor-pagination';
import { JwtAuthGuard } from '@admin/auth/guards/jwt-auth.guard';
import { CreateSensorValidationDto } from './dto/create.dto';
import { SensorsFilterDto } from './dto/get-sensors.dto';
import { Sensors } from '@app/sensors/sensors.entity';

@UseGuards(JwtAuthGuard)
@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @ApiOperation({ description: `Create a new sensor` })
  @Post()
  async create(@Body() createUserDto: CreateSensorValidationDto) {
    return this.sensorsService.create(createUserDto);
  }

  @ApiOperation({ description: `Get all user with pagination` })
  @Get()
  async findAllPaginated(
    @Query() searchParams: SensorsFilterDto,
  ): Promise<PagingResult<Sensors>> {
    return this.sensorsService.findAllPaginated(searchParams);
  }
}
