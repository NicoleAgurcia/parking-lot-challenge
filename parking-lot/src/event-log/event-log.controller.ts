import { Controller, Post, Param, Get, Response } from '@nestjs/common';
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

  @Get('generateReport/:fileName')
  async generateReport(@Response() res, @Param('fileName') fileName) {
    const report = await this.eventLogService.generateReport();
    const csv = this.eventLogService.csvReport(report);

    res.attachment(`${fileName}.csv`);
    res.status(200).send(csv);
  }
}
