import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserExistsValidatorByIdentifier } from './validators/user-exists-by-identifier.validator';
import { UserValidator } from './user.validator';
import { User } from '@app/user/user.entity';
import { UserSubscriber } from '@app/user/user.subscriber';
import { UserModule as CommonUserModule } from '@app/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CommonUserModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserExistsValidatorByIdentifier,
    UserValidator,
    UserSubscriber,
  ],
  exports: [UserService],
})
export class UserModule {}
