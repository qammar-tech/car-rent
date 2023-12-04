import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { GamesRepository } from './games.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GamesSubscriber } from '@app/games/games.subscriber';
import { Games } from '@app/games/games.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Games])],
  controllers: [GamesController],
  providers: [GamesService, GamesRepository, GamesSubscriber],
  exports: [GamesService],
})
export class GamesModule {}
