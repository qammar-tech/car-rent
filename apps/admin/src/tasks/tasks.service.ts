import { Injectable } from '@nestjs/common';
import { TaskRepository } from './tasks.repository';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksFilterDto } from './dto/task.filter.dto';
import { PagingResult } from 'typeorm-cursor-pagination';
import { User } from '@app/user/user.entity';
import { UserType } from '@admin/auth/auth.types';
import { CreateTaskDto } from './dto/create-task.dto';
import { Tasks } from '@app/tasks/tasks.entity';
import { AdminService } from '../admin/admin.service';
import { UserService } from '../user/user.service';
import { TaskStatus } from '@app/tasks';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly adminService: AdminService,
    private readonly userService: UserService,
  ) {}

  async create(user: User, data: CreateTaskDto) {
    const queryRunner = this.taskRepository.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      let task: Tasks;

      if (user.role === UserType.Admin) {
        const foundedUser = await this.adminService.findByUuid(user.uuid);
        task = await this.taskRepository.save({
          ...data,
          adminId: foundedUser.id,
        });
      } else {
        const foundedUser = await this.userService.findByUuid(user.uuid);
        task = await this.taskRepository.save({
          ...data,
          userId: foundedUser.id,
        });
      }

      await queryRunner.commitTransaction();

      return this.taskRepository.findOne({ where: { id: task.id } });
    } catch (err) {
      await queryRunner.rollbackTransaction();

      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async delete(uuid: string) {
    await this.taskRepository.update(
      { uuid: uuid },
      { status: TaskStatus.DELETED },
    );
  }

  async update(uuid: string, data: UpdateTaskDto) {
    await this.taskRepository.update({ uuid }, data);

    return this.findByUuid(uuid);
  }

  async findAllPaginated(
    searchParams: TasksFilterDto,
  ): Promise<PagingResult<Tasks>> {
    return this.taskRepository.getPaginatedQueryBuilder(searchParams);
  }

  async findByUuid(uuid: string): Promise<Tasks> {
    return this.taskRepository.findOne({ where: { uuid } });
  }
}
