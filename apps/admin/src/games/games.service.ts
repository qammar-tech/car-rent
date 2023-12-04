import { Injectable } from '@nestjs/common';
import { GamesRepository } from './games.repository';

@Injectable()
export class GamesService {
  constructor(private readonly gamesRepository: GamesRepository) {}

  //   async create(createUserData: CreateUserValidationDto) {
  //     const { repeatPassword, ...restParams } = createUserData;
  //     const queryRunner = this.userRepository.dataSource.createQueryRunner();

  //     try {
  //       await queryRunner.connect();
  //       await queryRunner.startTransaction();

  //       const user = await this.userRepository.save({ ...restParams });

  //       await queryRunner.commitTransaction();

  //       return this.userRepository.findOne({ where: { id: user.id } });
  //     } catch (err) {
  //       await queryRunner.rollbackTransaction();

  //       throw err;
  //     } finally {
  //       await queryRunner.release();
  //     }
  //   }

  //   async findAllPaginated(
  //     searchParams: UserFilterDto,
  //   ): Promise<PagingResult<User>> {
  //     return this.userRepository.getPaginatedQueryBuilder(searchParams);
  //   }

  //   async findById(id: number): Promise<User> {
  //     return this.userRepository.findOne({ where: { id } });
  //   }
}
