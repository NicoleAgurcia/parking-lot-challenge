import { Module } from '@nestjs/common';
import { ParkingLotsController } from './parking-lots.controller';
import { ParkingLotsService } from './parking-lots.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ParkingLots, ParkingLotsSchema } from './schemas/parking-lots.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ParkingLots.name, schema: ParkingLotsSchema },
    ]),
  ],
  controllers: [ParkingLotsController],
  providers: [ParkingLotsService],
})
export class ParkingLotsModule {}
