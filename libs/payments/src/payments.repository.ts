import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Payments } from './payments.entity';

@Injectable()
export class PaymentsRepository extends Repository<Payments> {
  constructor(public readonly dataSource: DataSource) {
    super(Payments, dataSource.manager);
  }
}
