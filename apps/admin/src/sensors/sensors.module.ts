import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorsController } from './sensors.controller';
import { SensorsRepoRepository } from './sensors.repository';
import { SensorsService } from './sensors.service';
import { SensorsSubscriber } from '@app/sensors/sensors.subscriber';
import { SensorsModule as CommonUserModule } from '@app/sensors/sensors.module';
import { Sensors } from '@app/sensors/sensors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sensors]), CommonUserModule],
  controllers: [SensorsController],
  providers: [SensorsService, SensorsRepoRepository, SensorsSubscriber],
  exports: [SensorsService],
})
export class SensorModule {}
