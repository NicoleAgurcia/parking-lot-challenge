import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class VehicleType extends Document {
  @Prop({required: true})
  description: string;

}

export const VehicleTypeSchema = SchemaFactory.createForClass(VehicleType);
