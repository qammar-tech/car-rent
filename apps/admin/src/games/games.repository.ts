import { Injectable } from '@nestjs/common';
import { GamesRepository as CommonRepo } from '@app/games/games.repository';

@Injectable()
export class GamesRepository extends CommonRepo {}
