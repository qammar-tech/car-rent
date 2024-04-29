import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksRepo } from './tasks.repository';

@Module({
  providers: [TasksService, TasksRepo],
  exports: [TasksService],
})
export class TasksModule {}
