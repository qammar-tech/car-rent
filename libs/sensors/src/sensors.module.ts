import { Module } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { SensorsRepo } from './sensors.repository';

@Module({
  providers: [SensorsService, SensorsRepo],
  exports: [SensorsService],
})
export class SensorsModule {}
