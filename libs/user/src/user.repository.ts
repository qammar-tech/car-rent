import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepo extends Repository<User> {
  constructor(public readonly dataSource: DataSource) {
    super(User, dataSource.manager);
  }
}
