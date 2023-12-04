import {
  InsertEvent,
  UpdateEvent,
  EventSubscriber,
  EntitySubscriberInterface,
} from 'typeorm';
import { Games } from './games.entity';
import { v4 as uuid } from 'uuid';

@EventSubscriber()
export class GamesSubscriber implements EntitySubscriberInterface<Games> {
  listenTo(): any {
    return Games;
  }

  beforeInsert(event: InsertEvent<Games>): void | Promise<any> {
    if (!event.entity.uuid) {
      event.entity.uuid = uuid();
    }
  }

  beforeUpdate(event: UpdateEvent<Games>): void | Promise<any> {
    event.entity.updatedAt = new Date();
  }
}
