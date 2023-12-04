import { UserType } from '@admin/auth/auth.types';
import { UserService } from '@admin/user/user.service';
import { Injectable } from '@nestjs/common';
import { CreatePaymentValidationDto } from './dto/create-payment.dto';
import { PaymentsRepository } from './payments.repository';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentsRepository: PaymentsRepository,
    private readonly userService: UserService,
  ) {}

  async create(data: CreatePaymentValidationDto) {
    const user = await this.userService.findByEmail(data.user.email);
    const queryRunner = this.paymentsRepository.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const payment = await this.paymentsRepository.save({
        userId: user.role === UserType.Individual ? user.id : null,
        groupId: user.role === UserType.Individual ? null : user.id,
      });

      await this.userService.updateUserCredits(user.id);

      await queryRunner.commitTransaction();

      return this.paymentsRepository.findOne({ where: { id: payment.id } });
    } catch (err) {
      await queryRunner.rollbackTransaction();

      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
