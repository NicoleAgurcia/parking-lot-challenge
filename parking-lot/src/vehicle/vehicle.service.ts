import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Vehicle } from './schemas/vehicle.schema';
import { Model } from 'mongoose';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<Vehicle>,
  ) {}

  getVehicles() {
    return this.vehicleModel.find();
  }

  async createVehicle(plate: string, typeId: string) {
    const vehicles = await this.vehicleModel.find({ plate });
    if (vehicles.length > 0) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    return await this.vehicleModel.create({ plate, typeId });
  }

  async getVehiclesByType(typeId: string) {
    return this.vehicleModel.find({ typeId });
  }

  async findByPlate(plate: string): Promise<Vehicle> {
    return this.vehicleModel.findOne({ plate });
  }
}
