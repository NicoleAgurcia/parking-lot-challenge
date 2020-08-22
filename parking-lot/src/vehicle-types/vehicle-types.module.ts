import { Module } from '@nestjs/common';
import { VehicleTypesController } from './vehicle-types.controller';
import { VehicleTypesService } from './vehicle-types.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleType, VehicleTypeSchema } from './schemas/vehicleTypes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VehicleType.name, schema: VehicleTypeSchema },
    ]),
  ],
  controllers: [VehicleTypesController],
  providers: [VehicleTypesService],
})
export class VehicleTypesModule {}
