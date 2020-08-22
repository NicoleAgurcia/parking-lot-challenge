import {Module} from '@nestjs/common';
import {AuthenticationController} from './authentication/authentication.controller';
import {AuthenticationService} from './services/authentication/authentication.service';
import {UsersModule} from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthModule {}
