import { Module, HttpModule } from '@nestjs/common';
import { EventLogController } from './event-log.controller';
import { EventLogService } from './event-log.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventLog, EventLogSchema } from './schemas/event-log.schema';
import { VehicleModule } from '../vehicle/vehicle.module';
import { VehicleTypesModule } from '../vehicle-types/vehicle-types.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventLog.name, schema: EventLogSchema },
    ]),
    VehicleModule,
    VehicleTypesModule,
    AuthModule,
    HttpModule,
  ],
  controllers: [EventLogController],
  providers: [EventLogService],
})
export class EventLogModule {}
