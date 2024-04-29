import { UserType } from '../auth.types';
import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../auth.types';

export const Roles = (...roles: UserType[]) => SetMetadata(ROLES_KEY, roles);
