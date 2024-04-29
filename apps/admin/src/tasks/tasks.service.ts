import { BadRequestException, Injectable } from '@nestjs/common';
import { TaskRepository } from './tasks.repository';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksFilterDto } from './dto/task.filter.dto';
import { PagingResult } from 'typeorm-cursor-pagination';
import { User } from '@app/user/user.entity';
import { UserType } from '@admin/auth/auth.types';
import { v4 as uuid } from 'uuid';
import { DateTime } from 'luxon';
import { ConfigService } from '@nestjs/config';
import { AdminUsers } from '@app/user/admin-user.entity';
import { SignUpDto } from '@admin/auth/dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
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

  // async findByInviteLink(inviteLink: string): Promise<User> {
  //   return this.userRepository.findValidUser(inviteLink);
  // }

  async update(uuid: string, data: UpdateTaskDto) {
    await this.taskRepository.update({ uuid }, data);

    return this.findByUuid(uuid);
  }

  // async signUpUser(data: SignUpDto) {
  //   const passwordHash = await bcrypt.hash(data.password, 10);
  //   await this.userRepository.update(
  //     { email: data.email },
  //     {
  //       password: passwordHash,
  //       invitationExpiresAt: null,
  //       inviteLink: null,
  //       status: UserStatus.Active,
  //     },
  //   );

  //   return this.findByEmail(data.email);
  // }

  async findAllPaginated(
    searchParams: TasksFilterDto,
  ): Promise<PagingResult<Tasks>> {
    return this.taskRepository.getPaginatedQueryBuilder(searchParams);
  }

  // async findById(id: number): Promise<User> {
  //   return this.userRepository.findOne({ where: { id } });
  // }

  // async findByEmail(email: string): Promise<User> {
  //   return this.userRepository.findOne({ where: { email } });
  // }

  async findByUuid(uuid: string): Promise<Tasks> {
    return this.taskRepository.findOne({ where: { uuid } });
  }

  // async findByUserIdAndTicketProviderId(
  //   userId: number,
  //   ticketProviderId: number,
  // ): Promise<User> {
  //   return this.userRepository.findOne({ where: { id: userId } });
  // }

  // async findUserByEmailOrPhoneNumber(value: string): Promise<boolean> {
  //   const user = this.userRepository.findBy({ email: value });

  //   return user !== null;
  // }

  // async isUserExist(id: number): Promise<boolean> {
  //   const user = await this.userRepository.findOne({ where: { id } });

  //   return user !== null;
  // }

  // async addUser(data: AddUserValidationDto, adminId?: number) {
  //   const userExists = await this.findByEmail(data.email);

  //   if (userExists) {
  //     throw new BadRequestException('User with email already exists');
  //   }

  //   const queryRunner = this.userRepository.dataSource.createQueryRunner();

  //   try {
  //     await queryRunner.connect();
  //     await queryRunner.startTransaction();

  //     const user = await this.userRepository.save({
  //       ...data,
  //       password: '',
  //       status: data.status ? data.status : UserStatus.Creating,
  //       role: UserType.Client,
  //       inviteLink: uuid(),
  //       invitationExpiresAt: DateTime.now()
  //         .plus({
  //           hours: this.configService.get('appConfig.invitationLinkExpiresIn'),
  //         })
  //         .toJSDate(),
  //     });

  //     await queryRunner.manager.insert(AdminUsers, {
  //       userId: user.id,
  //       adminId: adminId,
  //     });

  //     await queryRunner.commitTransaction();

  //     return this.userRepository.findOne({ where: { id: user.id } });
  //   } catch (err) {
  //     await queryRunner.rollbackTransaction();

  //     throw err;
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }

  // async resendInviteLink(email: string) {
  //   const user = await this.findByEmail(email);

  //   if (!user) {
  //     throw new BadRequestException('User with email not exists');
  //   }

  //   await this.userRepository.update(
  //     { email },
  //     {
  //       invitationExpiresAt: DateTime.now()
  //         .plus({
  //           hours: this.configService.get('appConfig.invitationLinkExpiresIn'),
  //         })
  //         .toJSDate(),
  //     },
  //   );
  // }
}
