import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {UsersService} from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  validateIdentityParams(body) {
    const {username, password} = body;
    if (!username || !password) {
      throw new HttpException(
        'Missing password or username',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  addUser(@Body() body) {
    const {username, password} = body;
    this.validateIdentityParams(body);

    return this.userService.createUser(username, password);
  } 
}
