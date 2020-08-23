import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VehicleTypesService } from './vehicle-types/vehicle-types.service';
import { VehicleService } from './vehicle/vehicle.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const vehicleTypeService = app.get(VehicleTypesService);
  const vehicleService = app.get(VehicleService);
  const types = await vehicleTypeService.getVehicleTypes();
  const vehicles = await vehicleService.getVehicles();

  await app.listen(4000);
  let vehicleTypesResult;
  if (!types.length) {
    vehicleTypesResult = await vehicleTypeService.createVehicleTypes([
      'Residente',
      'Oficial',
    ]);
    console.log('Created default vehicle types', vehicleTypesResult);
  }

  if (vehicleTypesResult.length && !vehicles.length) {
    await vehicleService.createVehicle('RE-2125', vehicleTypesResult[0]._id);
    await vehicleService.createVehicle('OF-2032', vehicleTypesResult[1]._id);
    console.log('Created Resident vehicle: RE-2125');
    console.log('Created Oficial vehicle: OF-2032');
  }
}
bootstrap();
