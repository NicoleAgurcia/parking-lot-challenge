import { Injectable, Post, HttpException, HttpStatus } from '@nestjs/common';
import { EventLog } from './schemas/event-log.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EventLogService {
  constructor(
    @InjectModel(EventLog.name) private eventLogModel: Model<EventLog>,
  ) {}

  async registerEntry(plate: string) {
    let [register] = await this.eventLogModel
      .find({ plate })
      .sort({ startDate: -1 });

    if (register && !register.endDate) {
      throw new HttpException(
        `Departure event is pending for vehicle plate ${plate}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const params = {
      plate,
      startDate: new Date(),
      endDate: null,
      active: true,
    };
    return this.eventLogModel.create(params);
  }

  async registerDeparture(plate: string) {
    let [register] = await this.eventLogModel
      .find({ plate })
      .sort({ startDate: -1 });

    if (!register || register.endDate) {
      throw new HttpException(
        `No corresponding entry event for vehicle plate ${plate}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    register.endDate = new Date();
    await register.save();
    return register;
  }
}
