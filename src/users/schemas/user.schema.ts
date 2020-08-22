import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Exclude} from 'class-transformer';
import {Document} from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({required: true})
  username: string;

  @Prop({required: true})
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
