import { Injectable } from '@nestjs/common';
import { SensorsRepo as CommonRepository } from '@app/sensors/sensors.repository';
import { SensorsFilterDto } from './dto/get-sensors.dto';
import { buildPaginator, PagingResult } from 'typeorm-cursor-pagination';
import { Like } from 'typeorm';
import { Sensors } from '@app/sensors/sensors.entity';

@Injectable()
export class SensorsRepoRepository extends CommonRepository {
  async getPaginatedQueryBuilder(
    searchParams: SensorsFilterDto,
  ): Promise<PagingResult<Sensors>> {
    const queryBuilder = this.createQueryBuilder('sensors');

    if ('searchText' in searchParams) {
      queryBuilder.andWhere([{ name: Like(`%${searchParams.searchText}%`) }]);
    }

    const paginator = buildPaginator({
      entity: Sensors,
      paginationKeys: ['id', searchParams.orderParam],
      query: {
        limit: searchParams.limit,
        order: searchParams.orderType,
        afterCursor: searchParams.afterCursor,
        beforeCursor: searchParams.beforeCursor,
      },
    });

    return paginator.paginate(queryBuilder);
  }
}
