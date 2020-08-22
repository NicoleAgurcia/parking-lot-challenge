import { Module, HttpModule } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from './schemas/vehicle.schema';
import { VehicleService } from './vehicle.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }]),
    AuthModule,
    HttpModule
  ],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
