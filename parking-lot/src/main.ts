import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VehicleTypesService } from './vehicle-types/vehicle-types.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const vehicleService = app.get(VehicleTypesService);
  const types = await vehicleService.getVehicleTypes();

  await app.listen(4000);

  if (types.length == 0) {
    const result = await vehicleService.createVehicleTypes([
      'Residente',
      'Oficial',
    ]);
    console.log('Created default vehicle types', result);
  }
}
bootstrap();
