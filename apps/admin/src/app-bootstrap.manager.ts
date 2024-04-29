import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { json } from 'express';
import * as cookieParser from 'cookie-parser';

export class AppBootstrapManager {
  static getTestingModule(): Promise<TestingModule> {
    return Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  }

  static setAppDefaults(app: INestApplication): INestApplication {
    const reflector = app.get(Reflector);

    useContainer(app.select(AppModule), {
      fallbackOnErrors: true,
      fallback: true,
    });

    app
      .use(json({ limit: '50mb' }))
      .use(cookieParser())
      .setGlobalPrefix('api/v1')
      .useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          validationError: {
            target: false,
          },
          stopAtFirstError: true,
        }),
      );

    app.enableCors();

    return app;
  }
}
