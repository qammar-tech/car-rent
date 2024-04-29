import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TaskRepository } from './tasks.repository';
import { TaskService } from './tasks.service';
import { TasksSubscriber } from '@app/tasks/tasks.subscriber';
import { TasksModule as CommonTasksModule } from '@app/tasks/tasks.module';
import { Tasks } from '@app/tasks/tasks.entity';
import { AdminModule } from '../admin/admin.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tasks]),
    CommonTasksModule,
    AdminModule,
    UserModule,
  ],
  controllers: [TasksController],
  providers: [TaskService, TaskRepository, TasksSubscriber],
  exports: [TaskService],
})
export class TasksModule {}
