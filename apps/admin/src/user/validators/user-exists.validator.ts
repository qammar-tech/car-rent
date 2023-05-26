import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserValidator } from '../user.validator';

@ValidatorConstraint({ name: 'UserExistsValidator', async: true })
export class UserExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly userValidator: UserValidator) {}

  async validate(uuid: string) {
    return this.userValidator.isUserValid(uuid);
  }

  defaultMessage() {
    return `User is not valid.`;
  }
}
