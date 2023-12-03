import { Injectable } from '@nestjs/common';
import { SensorsRepo } from './sensors.repository';
import { Sensors } from './sensors.entity';

@Injectable()
export class SensorsService {
  constructor(private readonly sensorsRepo: SensorsRepo) {}

  async findByUuid(uuid: string): Promise<Sensors> {
    return this.sensorsRepo.findOne({ where: { uuid } });
  }

  async findById(id: number): Promise<Sensors> {
    return this.sensorsRepo.findOne({ where: { id } });
  }
}
