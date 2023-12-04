import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PaymentsRepository } from './payments.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Payments } from '@app/payments/payments.entity';
import { PaymentsSubscriber } from '@app/payments/payments.subscriber';
import { UserModule } from '@admin/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payments]), UserModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsRepository, PaymentsSubscriber],
  exports: [PaymentsService],
})
export class PaymentsModule {}
