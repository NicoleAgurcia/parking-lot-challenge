import {Module} from '@nestjs/common';
import {AuthenticationController} from './authentication/authentication.controller';
import {AuthenticationService} from './services/authentication/authentication.service';
import {UsersModule} from 'src/users/users.module';
import {PassportModule} from '@nestjs/passport';
import {LocalStrategy} from './services/authentication/local.strategy';
import {JwtModule} from '@nestjs/jwt';
import {jwtConstants} from './constants';
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '60s'},
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy],
})
export class AuthModule {}
