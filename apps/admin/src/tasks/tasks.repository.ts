import { Injectable } from '@nestjs/common';
import { buildPaginator, PagingResult } from 'typeorm-cursor-pagination';
import { TasksFilterDto } from './dto/task.filter.dto';
import { TasksRepo as CommonRepository } from '@app/tasks/tasks.repository';
import { Like } from 'typeorm';
import { Tasks } from '@app/tasks/tasks.entity';

@Injectable()
export class TaskRepository extends CommonRepository {
  async getPaginatedQueryBuilder(
    searchParams: TasksFilterDto,
  ): Promise<PagingResult<Tasks>> {
    const queryBuilder = this.createQueryBuilder('tasks');

    if ('searchText' in searchParams) {
      queryBuilder.andWhere([
        { name: Like(`%${searchParams.searchText}%`) },
        { description: Like(`%${searchParams.searchText}%`) },
      ]);
    }

    if ('userId' in searchParams) {
      queryBuilder.andWhere([
        { userId: searchParams.userId },
        { adminId: searchParams.userId },
      ]);
    }

    if ('status' in searchParams) {
      queryBuilder.andWhere([{ status: searchParams.status }]);
    }

    const paginator = buildPaginator({
      entity: Tasks,
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
