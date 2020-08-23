import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Vehicle extends Document {
  @Prop({required: true})
  plate: string;

  @Prop({required: true})
  typeId: string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
