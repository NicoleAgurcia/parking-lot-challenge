import { Controller, Post, Body, Param } from '@nestjs/common';
import { ParkingLotsService } from './parking-lots.service';

@Controller('parking-lots')
export class ParkingLotsController {
  constructor(private parkinLotsController: ParkingLotsService) {}

  @Post('entry/:plate')
  registerEntry(@Param('plate') plate) {
    return this.parkinLotsController.registerEntry(plate);
  }
  
  @Post('departure/:plate')
  registerDeparture(@Param('plate') plate) {
    return this.parkinLotsController.registerDeparture(plate);
  }
}
