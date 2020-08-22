import {Model} from 'mongoose';
import {Injectable, HttpException, HttpStatus} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {User} from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  saltRounds = 10;

  async getUsers() {
    return await this.userModel.find();
  }

  async createUser(username: string, password: string) {
    const users = await this.userModel.find({username});

    if (users.length > 0) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const encryptedPassword = await bcrypt.hash(password, this.saltRounds);

    const user = {username, password: encryptedPassword};
    return await this.userModel.create(user);
  }

  async getUserByUsername(username: string) {
    return this.userModel.findOne({username});
  }
}
