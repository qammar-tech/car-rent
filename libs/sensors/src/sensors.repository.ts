import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Sensors } from './sensors.entity';

@Injectable()
export class SensorsRepo extends Repository<Sensors> {
  constructor(public readonly dataSource: DataSource) {
    super(Sensors, dataSource.manager);
  }
}
