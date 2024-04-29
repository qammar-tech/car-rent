import { DateTime } from 'luxon';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '@admin/user/user.service';

@ValidatorConstraint({ name: 'inviteLinkValidator', async: true })
export class InviteLinkValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(
    inviteLink: string,
    args: ValidationArguments,
  ): Promise<boolean> {
    const isInviteLinkValid = await this.userService.findByInviteLink(
      inviteLink,
    );

    console.log('\n\n isInviteLinkValid: ', isInviteLinkValid);

    if (isInviteLinkValid) {
      return true;
    }
  }

  defaultMessage() {
    return 'Invite Link Expired or not found!';
  }
}
