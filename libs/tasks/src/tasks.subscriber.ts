import {
  InsertEvent,
  UpdateEvent,
  EventSubscriber,
  EntitySubscriberInterface,
} from 'typeorm';
import { Tasks } from './tasks.entity';
import { v4 as uuid } from 'uuid';

@EventSubscriber()
export class TasksSubscriber implements EntitySubscriberInterface<Tasks> {
  listenTo(): any {
    return Tasks;
  }

  beforeInsert(event: InsertEvent<Tasks>): void | Promise<any> {
    if (!event.entity.uuid) {
      event.entity.uuid = uuid();
    }
  }

  beforeUpdate(event: UpdateEvent<Tasks>): void | Promise<any> {
    event.entity.updatedAt = new Date();
  }
}
