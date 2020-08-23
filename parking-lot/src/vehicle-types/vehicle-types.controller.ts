import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { VehicleTypesService } from './vehicle-types.service';

@Controller('vehicle-types')
export class VehicleTypesController {
  constructor(private vehicleTypesService: VehicleTypesService) {}

  @Get(':id')
  getVehicleType(@Param('id') id) {
    return this.vehicleTypesService.getVehicleType(id);
  }

  @Get()
  getVehicleTypes() {
    return this.vehicleTypesService.getVehicleTypes();
  }

  @Post()
  createVehicleType(@Body() body) {
    const { description } = body;
    return this.vehicleTypesService.createVehicleType(description);
  }
}
