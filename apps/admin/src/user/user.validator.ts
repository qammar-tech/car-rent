import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { UserService as CommonUserService } from '@app/user/user.service';

@Injectable()
export class UserValidator {
  constructor(
    private readonly userService: UserService,
    private readonly commonUserService: CommonUserService,
  ) {}

  async isUserValid(uuid: string): Promise<boolean> {
    if (!uuid) {
      return false;
    }
    const user = await this.commonUserService.findByUuid(uuid);

    return user !== null;
  }

  async isEmailOrPhonePresent(value: string): Promise<boolean> {
    return this.userService.findUserByEmailOrPhoneNumber(value);
  }
}
