import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {AuthenticationService} from '../services/authentication/authentication.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  validateIdentityParams(body) {
    const {username, password} = body;
    if (!username || !password) {
      throw new HttpException(
        'Missing password or username',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Post()
  login(@Body() body) {
    const {username, password} = body;
    this.validateIdentityParams(body);

    return this.authService.validateUser(username, password);
  }
}
