import { Sensors } from '@app/sensors/sensors.entity';
import { Injectable } from '@nestjs/common';
import { PagingResult } from 'typeorm-cursor-pagination';
import { CreateSensorValidationDto } from './dto/create.dto';
import { SensorsFilterDto } from './dto/get-sensors.dto';
import { SensorsRepoRepository } from './sensors.repository';

@Injectable()
export class SensorsService {
  constructor(private readonly sensorsRepoRepository: SensorsRepoRepository) {}

  async create(createSensorData: CreateSensorValidationDto) {
    const queryRunner =
      this.sensorsRepoRepository.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const user = await this.sensorsRepoRepository.save({
        ...createSensorData,
      });

      await queryRunner.commitTransaction();

      return this.sensorsRepoRepository.findOne({ where: { id: user.id } });
    } catch (err) {
      await queryRunner.rollbackTransaction();

      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAllPaginated(
    searchParams: SensorsFilterDto,
  ): Promise<PagingResult<Sensors>> {
    return this.sensorsRepoRepository.getPaginatedQueryBuilder(searchParams);
  }
}
