import { Test, TestingModule } from "@nestjs/testing";
import { GymItemService } from "./gym-item.service";

describe("GymItemService", () => {
  let service: GymItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GymItemService],
    }).compile();

    service = module.get<GymItemService>(GymItemService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
