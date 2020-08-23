import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {UsersService} from './users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const userService = app.get(UsersService);
  const users = await userService.getUsers();

  await app.listen(3000);

  if (users.length == 0) {
    const result = await userService.createUser('admin', 'hugo123');
    console.log('Created default user', result);
  }
}
bootstrap();
