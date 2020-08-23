import { Injectable, Post, HttpException, HttpStatus } from '@nestjs/common';
import { EventLog } from './schemas/event-log.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { VehicleService } from '../vehicle/vehicle.service';
import { VehicleTypesService } from '../vehicle-types/vehicle-types.service';
const { convertArrayToCSV } = require('convert-array-to-csv');

@Injectable()
export class EventLogService {
  constructor(
    @InjectModel(EventLog.name) private eventLogModel: Model<EventLog>,
    private vehicleService: VehicleService,
    private vehicleTypesService: VehicleTypesService,
  ) {}

  async registerEntry(plate: string) {
    let [register] = await this.eventLogModel
      .find({ plate, active: true })
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
      .find({ plate, active: true })
      .sort({ startDate: -1 });

    if (!register || register.endDate) {
      throw new HttpException(
        `No corresponding entry event for vehicle plate ${plate}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    register.endDate = new Date();
    await register.save();

    const vehicle = await this.vehicleService.findByPlate(plate);
    const minutes = this.calculateMinutes(register);
    const fee = this.calculateFee(register, 0.5);

    if (!vehicle) {
      return { plate, minutes, fee, type: 'NON RESIDENT' };
    }

    const vehicleType = await this.vehicleTypesService.getVehicleType(
      vehicle.typeId,
    );

    return { plate, minutes, fee: 0, type: vehicleType.description };
  }

  async resetEventLogs() {
    const { nModified } = await this.eventLogModel.updateMany(
      { active: true },
      { active: false },
    );
    return { count: nModified };
  }

  async getActiveLogs(): Promise<EventLog[]> {
    return this.eventLogModel.find({ active: true });
  }

  async generateReport() {
    const logs = await this.getActiveLogs();
    const vehicleType = await this.vehicleTypesService.getVehicleTypeByDescription(
      'Residente',
    );
    const residentVehicles = await this.vehicleService.getVehiclesByType(
      vehicleType._id,
    );
    const residentPlates = residentVehicles.map(vehicle => vehicle.plate);

    const residentDefaultInfo = residentPlates.reduce((prev, cur) => {
      prev[cur] = { minutes: 0, fee: 0 };
      return prev;
    }, {});

    const logsDictionary = logs.reduce((prev: any, cur: EventLog) => {
      if (!prev[cur.plate]) {
        return prev;
      }
      prev[cur.plate].fee += this.calculateFee(cur, 0.05);
      prev[cur.plate].minutes += this.calculateMinutes(cur);
      return prev;
    }, residentDefaultInfo);

    return logsDictionary;
  }

  calculateMinutes(cur: EventLog): number {
    const delta: number = cur.endDate.getTime() - cur.startDate.getTime();
    return +(delta / 1000 / 60).toFixed(4);
  }

  calculateFee(cur: EventLog, rate: number) {
    if (!cur.endDate) return 0;
    const mins = this.calculateMinutes(cur);

    return +(mins * rate).toFixed(4);
  }

  csvReport(report: any) {
    const entries = Object.keys(report).map(key => ({
      plate: key,
      ...report[key],
    }));

    const header = [
      'Num. Placa',
      'Tiempo estacionado (min)',
      'Cantidad a pagar',
    ];

    return convertArrayToCSV(entries, { header });
  }
}
