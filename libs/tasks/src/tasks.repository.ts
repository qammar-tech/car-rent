import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Tasks } from './tasks.entity';

@Injectable()
export class TasksRepo extends Repository<Tasks> {
  constructor(public readonly dataSource: DataSource) {
    super(Tasks, dataSource.manager);
  }
}
