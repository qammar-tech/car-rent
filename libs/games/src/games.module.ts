import { GamesSubscriber } from './games.subscriber';
import { Games } from './games.entity';
import { GamesService } from './games.service';
import { GamesRepository } from './games.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Games])],
  providers: [GamesService, GamesRepository, GamesSubscriber],
  exports: [GamesService],
})
export class GamesModule {}
