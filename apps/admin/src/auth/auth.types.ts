import { Admin } from '@admin/admin/admin.entity';
import { User } from '@app/user/user.entity';
import { Request } from 'express';

export interface AccessTokenInterface {
  uuid: string;
  name: string;
  email: string;
  user?: any
}

export interface AuthRequest extends Request {
  admin: Admin;
  user: User;
}

export enum UserType {
  Individual = 'individual',
  Organization = 'organization',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GuestRequest extends Request {}
