import {
  InsertEvent,
  UpdateEvent,
  EventSubscriber,
  EntitySubscriberInterface,
} from 'typeorm';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo(): any {
    return User;
  }

  beforeInsert(event: InsertEvent<User>): void | Promise<any> {
    if (!event.entity.uuid) {
      event.entity.uuid = uuid();
    }
  }

  beforeUpdate(event: UpdateEvent<User>): void | Promise<any> {
    event.entity.updatedAt = new Date();
  }
}
