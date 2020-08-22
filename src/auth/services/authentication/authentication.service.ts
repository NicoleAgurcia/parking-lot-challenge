import {Injectable, HttpException, HttpStatus} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {UsersService} from 'src/users/users.service';

@Injectable()
export class AuthenticationService {
  constructor(private userService: UsersService) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);

    const isSamePassword = await bcrypt.compare(password, user.password);

    if (!user || !isSamePassword) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
