import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { VehicleTypesService } from './vehicle-types.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('vehicle-types')
@UseGuards(AuthGuard)
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
