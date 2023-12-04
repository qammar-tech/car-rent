import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Games } from './games.entity';

@Injectable()
export class GamesRepository extends Repository<Games> {
  constructor(public readonly dataSource: DataSource) {
    super(Games, dataSource.manager);
  }
}
