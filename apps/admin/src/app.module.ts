import { Module } from '@nestjs/common';
import path = require('path');
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EnvHelper } from '@app/env/env.helper';
import appConfig from './config/app.config';
import jwtConfig from './config/jwt.config';
import { validateAdmin } from '@app/env/env.validator';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import {
  AcceptLanguageResolver,
  I18nJsonLoader,
  I18nModule,
} from 'nestjs-i18n';
import { Locale } from '@app/common/translations/translation.types';
import { DatabaseModule } from '@app/database/database.module';
import { AdminSeederService } from './admin/admin-seed.service';
import { TasksModule } from './tasks/tasks.module';

EnvHelper.verifyNodeEnv();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: EnvHelper.getEnvFilePath(),
      isGlobal: true,
      load: [appConfig, jwtConfig],
      validate: validateAdmin,
    }),
    I18nModule.forRoot({
      fallbackLanguage: Locale.en_US,
      loader: I18nJsonLoader,
      loaderOptions: {
        path: EnvHelper.isTest()
          ? path.join(__dirname, '../i18n')
          : path.join(__dirname, '../../../i18n'),
        watch: true,
      },
      fallbacks: {
        'pt-*': Locale.pt_BR,
      },
      resolvers: [AcceptLanguageResolver],
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    AdminModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService, AdminSeederService],
})
export class AppModule {}
