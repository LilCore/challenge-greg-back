import { Test, TestingModule } from "@nestjs/testing";
import { GymItemController } from "./gym-item.controller";
import { GymItemService } from "./gym-item.service";
import { CreateGymItemDto } from "./dto/create-gym-item.dto";
import { UpdateGymItemDto } from "./dto/update-gym-item.dto";

describe("GymItemController", () => {
  let controller: GymItemController;
  let service: GymItemService;

  const mockGymItemService = {
    create: jest.fn(),
    findGymItems: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GymItemController],
      providers: [
        {
          provide: GymItemService,
          useValue: mockGymItemService,
        },
      ],
    })
      .overrideGuard(
        // Use the string path if JwtAuthGuard is imported via path, or use the class if imported directly
        // For path-based import, use the string as below
        "JwtAuthGuard",
      )
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<GymItemController>(GymItemController);
    service = module.get<GymItemService>(GymItemService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should call service.create with correct dto", async () => {
      const dto: CreateGymItemDto = {
        name: "Dumbbell",
        price: 10,
        details: "",
        isFavorite: false,
        userId: "",
      };
      const result = { id: "1", ...dto };
      mockGymItemService.create.mockResolvedValue(result);

      const response = await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(response).toEqual(result);
    });
  });

  describe("findGymItems", () => {
    it("should call service.findGymItems with correct id", async () => {
      const id = "gym123";
      const items = [{ id: "1", name: "Dumbbell" }];
      mockGymItemService.findGymItems.mockResolvedValue(items);

      const response = await controller.findGymItems(id);
      expect(service.findGymItems).toHaveBeenCalledWith(id);
      expect(response).toEqual(items);
    });
  });

  describe("update", () => {
    it("should call service.update with correct params", async () => {
      const id = "item123";
      const dto: UpdateGymItemDto = { name: "Barbell" };
      const updated = { id, ...dto };
      mockGymItemService.update.mockResolvedValue(updated);

      const response = await controller.update(id, dto);
      expect(service.update).toHaveBeenCalledWith(id, dto);
      expect(response).toEqual(updated);
    });
  });

  describe("remove", () => {
    it("should call service.remove with correct id", async () => {
      const id = "item123";
      mockGymItemService.remove.mockResolvedValue({ deleted: true });

      const response = await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
      expect(response).toEqual({ deleted: true });
    });
  });
});
