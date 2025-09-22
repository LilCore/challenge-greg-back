import { Test, TestingModule } from "@nestjs/testing";
import { GymItemService } from "./gym-item.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { GymItem } from "./entities/gym-item.entity";
// import { Repository } from "typeorm";

const mockGymItemRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe("GymItemService", () => {
  let service: GymItemService;
  let repo: typeof mockGymItemRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GymItemService,
        {
          provide: getRepositoryToken(GymItem),
          useValue: mockGymItemRepository,
        },
      ],
    }).compile();

    service = module.get<GymItemService>(GymItemService);
    repo = module.get(getRepositoryToken(GymItem));
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a gym item with valid data", async () => {
      const dto = {
        name: "Dumbbell",
        details: "10kg",
        price: 20,
        isFavorite: false,
        userId: "123e4567-e89b-12d3-a456-426614174000",
      };
      const created = { ...dto, id: "item-id", user: { id: dto.userId } };
      repo.create.mockReturnValue(created);
      repo.save.mockResolvedValue(created);

      const result = await service.create(dto);

      expect(repo.create).toHaveBeenCalledWith({
        ...dto,
        user: { id: dto.userId },
      });
      expect(repo.save).toHaveBeenCalledWith(created);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(created);
    });

    it("should return error for invalid data", async () => {
      const dto = {
        name: "Dumbbell",
        details: "10kg",
        price: -5,
        isFavorite: false,
        userId: "not-a-uuid",
      };
      const result = await service.create(dto as any);
      expect(result.success).toBe(false);
      expect(result.message).toBe("Invalid gym item data");
      expect(result.errors).toBeDefined();
    });
  });

  describe("findGymItems", () => {
    it("should return gym items for a user", async () => {
      const userId = "123e4567-e89b-12d3-a456-426614174000";
      const items = [{ id: "1", name: "Dumbbell", user: { id: userId } }];
      repo.find.mockResolvedValue(items);

      const result = await service.findGymItems(userId);

      expect(repo.find).toHaveBeenCalledWith({
        where: { user: { id: userId } },
      });
      expect(result.success).toBe(true);
      expect(result.data).toEqual(items);
    });

    it("should handle errors", async () => {
      repo.find.mockRejectedValue(new Error("DB error"));
      const result = await service.findGymItems("id");
      expect(result.success).toBe(false);
      expect(result.message).toBe("DB error");
    });
  });

  describe("update", () => {
    it("should update an existing gym item", async () => {
      const id = "item-id";
      const dto = { name: "Barbell" };
      const gymItem = { id, name: "Old", user: { id: "user-id" } };
      const updated = { id, name: "Barbell", user: { id: "user-id" } };

      repo.findOne.mockResolvedValueOnce(gymItem);
      repo.update.mockResolvedValue(undefined);
      repo.findOne.mockResolvedValueOnce(updated);

      const result = await service.update(id, dto);

      expect(repo.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(repo.update).toHaveBeenCalledWith(id, dto);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(updated);
    });

    it("should return error if gym item not found", async () => {
      repo.findOne.mockResolvedValue(null);
      const result = await service.update("not-found", { name: "Barbell" });
      expect(result.success).toBe(false);
      expect(result.message).toBe("Gym item not found");
    });

    it("should return error for invalid update data", async () => {
      const id = "item-id";
      const dto = { price: -10 };
      const result = await service.update(id, dto as any);
      expect(result.success).toBe(false);
      expect(result.message).toBe("Invalid gym item data");
      expect(result.errors).toBeDefined();
    });
  });

  describe("remove", () => {
    it("should remove an existing gym item", async () => {
      const id = "item-id";
      const gymItem = { id, name: "Barbell", user: { id: "user-id" } };
      repo.findOne.mockResolvedValue(gymItem);
      repo.remove.mockResolvedValue(gymItem);

      const result = await service.remove(id);

      expect(repo.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(repo.remove).toHaveBeenCalledWith(gymItem);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(gymItem);
    });

    it("should return error if gym item not found", async () => {
      repo.findOne.mockResolvedValue(null);
      const result = await service.remove("not-found");
      expect(result.success).toBe(false);
      expect(result.message).toBe("Gym item not found");
    });

    it("should handle errors", async () => {
      repo.findOne.mockRejectedValue(new Error("DB error"));
      const result = await service.remove("id");
      expect(result.success).toBe(false);
      expect(result.message).toBe("DB error");
    });
  });
});

// We recommend installing an extension to run jest tests.
