import { Test, TestingModule } from '@nestjs/testing';
import { GymItemController } from './gym-item.controller';
import { GymItemService } from './gym-item.service';

describe('GymItemController', () => {
  let controller: GymItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GymItemController],
      providers: [GymItemService],
    }).compile();

    controller = module.get<GymItemController>(GymItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
