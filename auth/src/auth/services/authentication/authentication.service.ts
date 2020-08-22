import {Injectable, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {UsersService} from 'src/users/users.service';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isSamePassword = await bcrypt.compare(password, user.password);

    if (!isSamePassword) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async generateToken(user) {
    const {username, _id} = user;
    const payload = {username, sub: _id};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
