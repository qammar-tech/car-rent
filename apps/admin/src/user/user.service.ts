import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserValidationDto } from './dto/create-user.validation.dto';
import { UpdateUserValidationDto } from './dto/update-user.validation.dto';
import { UserFilterDto } from './dto/user.filter.dto';
import { PagingResult } from 'typeorm-cursor-pagination';
import { User } from '@app/user/user.entity';
import { AddUserValidationDto } from './dto/add-user-to-group.dto';
import { UserStatus } from '@app/user';
import { UserType } from '@admin/auth/auth.types';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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

  async update(id: number, updateUserDto: UpdateUserValidationDto) {
    await this.userRepository.update({ id: id }, updateUserDto);

    return this.findById(id);
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

  async addUser(data: AddUserValidationDto) {
    const queryRunner = this.userRepository.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const user = await this.userRepository.save({
        ...data,
        password: 'password',
        status: data.status ? data.status : UserStatus.Active,
        role: UserType.Individual,
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

  async updateUserCredits(id: number) {
    return this.userRepository.update({ id: id }, { credits: '200.00' });
  }
}
