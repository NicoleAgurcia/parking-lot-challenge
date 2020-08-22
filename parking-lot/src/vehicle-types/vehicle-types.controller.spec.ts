import { Test, TestingModule } from '@nestjs/testing';
import { VehicleTypesController } from './vehicle-types.controller';

describe('VehicleTypes Controller', () => {
  let controller: VehicleTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleTypesController],
    }).compile();

    controller = module.get<VehicleTypesController>(VehicleTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
