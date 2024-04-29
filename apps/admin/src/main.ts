import { AppBootstrapManager } from './app-bootstrap.manager';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AdminSeederService } from './admin/admin-seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  AppBootstrapManager.setAppDefaults(app);
  const seeder = app.get(AdminSeederService);
  await seeder.seed();

  await app.listen(3000);
}
bootstrap();
