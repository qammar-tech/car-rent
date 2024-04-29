import { Injectable } from '@nestjs/common';
import { TasksRepo } from './tasks.repository';
import { Tasks } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepo: TasksRepo) {}

  async findByUuid(uuid: string): Promise<Tasks> {
    return this.tasksRepo.findOne({ where: { uuid } });
  }

  async findById(id: number): Promise<Tasks> {
    return this.tasksRepo.findOne({ where: { id } });
  }
}
