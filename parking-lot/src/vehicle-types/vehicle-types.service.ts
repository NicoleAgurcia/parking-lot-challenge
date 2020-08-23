import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VehicleType } from './schemas/vehicleTypes.schema';
import { Model } from 'mongoose';
const mongoose = require('mongoose');

@Injectable()
export class VehicleTypesService {
  constructor(
    @InjectModel(VehicleType.name) private vehicleTypeModel: Model<VehicleType>,
  ) {}

  getVehicleType(_id: string) {
    if (mongoose.Types.ObjectId.isValid(_id)) {
      return this.vehicleTypeModel.find({ _id });
    }

    throw new HttpException('Missing type', HttpStatus.UNPROCESSABLE_ENTITY);
  }
  
  getVehicleTypes() {
    return this.vehicleTypeModel.find();
  }

  async createVehicleType(description: string) {
    const vehicleType = await this.vehicleTypeModel.find({ description });
    if (vehicleType.length > 0) {
      throw new HttpException(
        'vehicle type already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.vehicleTypeModel.create({ description });
  }
}
