import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserValidationDto } from './dto/create-user.validation.dto';
import { UpdateUserValidationDto } from './dto/update-user.validation.dto';
import { UserFilterDto } from './dto/user.filter.dto';
import { PagingResult } from 'typeorm-cursor-pagination';
import { User } from '@app/user/user.entity';
import { AddUserValidationDto } from './dto/add-user-to-group.dto';
import { UserStatus } from '@app/user';
import { UserType } from '@admin/auth/auth.types';
import { v4 as uuid } from 'uuid';
import { DateTime } from 'luxon';
import { ConfigService } from '@nestjs/config';
import { AdminUsers } from '@app/user/admin-user.entity';
import { SignUpDto } from '@admin/auth/dto/sign-up.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserData: CreateUserValidationDto) {
    const { repeatPassword, ...restParams } = createUserData;
    const queryRunner = this.userRepository.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const user = await this.userRepository.save({ ...restParams });

      await queryRunner.commitTransaction();

      return this.userRepository.findOne({ where: { id: user.id } });
    } catch (err) {
      await queryRunner.rollbackTransaction();

      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findByInviteLink(inviteLink: string): Promise<User> {
    return this.userRepository.findValidUser(inviteLink);
  }

  async update(id: number, updateUserDto: UpdateUserValidationDto) {
    await this.userRepository.update({ id: id }, updateUserDto);

    return this.findById(id);
  }

  async signUpUser(data: SignUpDto) {
    const passwordHash = await bcrypt.hash(data.password, 10);
    await this.userRepository.update(
      { email: data.email },
      {
        password: passwordHash,
        invitationExpiresAt: null,
        inviteLink: null,
        status: UserStatus.Active,
      },
    );

    return this.findByEmail(data.email);
  }

  async findAllPaginated(
    searchParams: UserFilterDto,
  ): Promise<PagingResult<User>> {
    return this.userRepository.getPaginatedQueryBuilder(searchParams);
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByUuid(uuid: string): Promise<User> {
    return this.userRepository.findOne({ where: { uuid } });
  }

  async findByUserIdAndTicketProviderId(
    userId: number,
    ticketProviderId: number,
  ): Promise<User> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async findUserByEmailOrPhoneNumber(value: string): Promise<boolean> {
    const user = this.userRepository.findBy({ email: value });

    return user !== null;
  }

  async isUserExist(id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id } });

    return user !== null;
  }

  async addUser(data: AddUserValidationDto, adminId?: number) {
    const userExists = await this.findByEmail(data.email);

    if (userExists) {
      throw new BadRequestException('User with email already exists');
    }

    const queryRunner = this.userRepository.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const user = await this.userRepository.save({
        ...data,
        password: '',
        status: data.status ? data.status : UserStatus.Creating,
        role: UserType.Client,
        inviteLink: uuid(),
        invitationExpiresAt: DateTime.now()
          .plus({
            hours: this.configService.get('appConfig.invitationLinkExpiresIn'),
          })
          .toJSDate(),
      });

      await queryRunner.manager.insert(AdminUsers, {
        userId: user.id,
        adminId: adminId,
      });

      await queryRunner.commitTransaction();

      return this.userRepository.findOne({ where: { id: user.id } });
    } catch (err) {
      await queryRunner.rollbackTransaction();

      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async resendInviteLink(email: string) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User with email not exists');
    }

    await this.userRepository.update(
      { email },
      {
        invitationExpiresAt: DateTime.now()
          .plus({
            hours: this.configService.get('appConfig.invitationLinkExpiresIn'),
          })
          .toJSDate(),
      },
    );
  }
}
