import { Test, TestingModule } from '@nestjs/testing';
import { EventLogController } from './event-log.controller';

describe('EventLog Controller', () => {
  let controller: EventLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventLogController],
    }).compile();

    controller = module.get<EventLogController>(EventLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
