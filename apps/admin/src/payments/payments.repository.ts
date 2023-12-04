import { Injectable } from '@nestjs/common';
import { PaymentsRepository as CommonRepo } from '@app/payments/payments.repository';

@Injectable()
export class PaymentsRepository extends CommonRepo {}
