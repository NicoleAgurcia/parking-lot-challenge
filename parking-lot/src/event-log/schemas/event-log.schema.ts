import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class EventLog extends Document {
  @Prop({ required: true })
  plate: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  active: Boolean;
}

export const EventLogSchema = SchemaFactory.createForClass(EventLog);
