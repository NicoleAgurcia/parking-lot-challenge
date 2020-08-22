import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('vehicles')
@UseGuards(AuthGuard)
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @Get()
  getVehicles() {
    return this.vehicleService.getVehicles();
  }

  @Post()
  createVehicle(@Body() body) {
    const { plate, typeId } = body;
    return this.vehicleService.createVehicle(plate, typeId);
  }
}
