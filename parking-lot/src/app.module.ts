import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleModule } from './vehicle/vehicle.module';
import { VehicleTypesModule } from './vehicle-types/vehicle-types.module';
import { AuthModule } from './auth/auth.module';
import { EventLogModule } from './event-log/event-log.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/parkingLot'), VehicleModule, VehicleTypesModule, AuthModule, EventLogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
