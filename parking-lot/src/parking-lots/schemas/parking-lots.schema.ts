import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ParkingLots extends Document {
  @Prop({ required: true })
  plate: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  active: Boolean;
}

export const ParkingLotsSchema = SchemaFactory.createForClass(ParkingLots);
