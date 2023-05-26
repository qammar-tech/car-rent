import { faker } from '@faker-js/faker';
import { AppDataSource } from '@app/common/configs/datasource';
import { User } from '@app/user/user.entity';
import { UserStatus } from '@app/user/user.types';

export class UserFactory {
  static async create(data?: Partial<User>) {
    const user = new User();
    user.name = faker.name.firstName();
    user.email = faker.internet.email();
    user.phoneNumber = faker.phone.number('+38050#######').toString();
    user.status = UserStatus.Active;

    return AppDataSource.manager.getRepository(User).save({ ...user, ...data });
  }

  static createEntity(data?: Partial<User>) {
    const user = new User();
    user.name = faker.name.firstName();
    user.email = faker.internet.email();
    user.phoneNumber = faker.phone.number('+38050#######').toString();
    user.status = UserStatus.Active;

    Object.assign(user, data);

    return user;
  }
}
