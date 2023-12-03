import {
  InsertEvent,
  UpdateEvent,
  EventSubscriber,
  EntitySubscriberInterface,
} from 'typeorm';
import { Sensors } from './sensors.entity';
import { v4 as uuid } from 'uuid';

@EventSubscriber()
export class SensorsSubscriber implements EntitySubscriberInterface<Sensors> {
  listenTo(): any {
    return Sensors;
  }

  beforeInsert(event: InsertEvent<Sensors>): void | Promise<any> {
    if (!event.entity.uuid) {
      event.entity.uuid = uuid();
    }
  }

  beforeUpdate(event: UpdateEvent<Sensors>): void | Promise<any> {
    event.entity.updatedAt = new Date();
  }
}
