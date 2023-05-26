import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepo } from './user.repository';

@Module({
  providers: [UserService, UserRepo],
  exports: [UserService],
})
export class UserModule {}
