import {
  UpdateEvent,
  EventSubscriber,
  EntitySubscriberInterface,
} from 'typeorm';
import { Payments } from './payments.entity';

@EventSubscriber()
export class PaymentsSubscriber implements EntitySubscriberInterface<Payments> {
  listenTo(): any {
    return Payments;
  }

  beforeUpdate(event: UpdateEvent<Payments>): void | Promise<any> {
    event.entity.updatedAt = new Date();
  }
}
