import {Controller, Post, UseGuards, Request} from '@nestjs/common';
import {AuthenticationService} from '../services/authentication/authentication.service';
import {AuthGuard} from '@nestjs/passport';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  async login(@Request() req) {
    return this.authService.generateToken(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('verify')
  async verify() {}
}
