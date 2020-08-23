import { Controller, Post, Param } from '@nestjs/common';
import { EventLogService } from './event-log.service';

@Controller('event-logs')
export class EventLogController {
  constructor(private eventLogService: EventLogService) {}

  @Post('entry/:plate')
  registerEntry(@Param('plate') plate) {
    return this.eventLogService.registerEntry(plate);
  }

  @Post('departure/:plate')
  registerDeparture(@Param('plate') plate) {
    return this.eventLogService.registerDeparture(plate);
  }

  @Post('reset')
  resetEventLog() {
    return this.eventLogService.resetEventLogs();
  }
}
