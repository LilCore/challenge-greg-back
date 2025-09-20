import { Injectable } from "@nestjs/common";
import { CreateGymItemDto } from "./dto/create-gym-item.dto";
import { UpdateGymItemDto } from "./dto/update-gym-item.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GymItem } from "./entities/gym-item.entity";
import * as z from "zod";

@Injectable()
export class GymItemService {
  constructor(
    @InjectRepository(GymItem)
    private readonly gymItemRepository: Repository<GymItem>,
  ) {}

  async create(createGymItemDto: CreateGymItemDto) {
    try {
      const ZodGymItem = z.object({
        name: z.string(),
        details: z.string(),
        price: z.number().min(0),
        isFavorite: z.boolean(),
      });
      const parsed = ZodGymItem.safeParse(createGymItemDto);
      if (!parsed.success) {
        return {
          success: false,
          message: "Invalid gym item data",
          errors: parsed.error,
        };
      }

      const newGymItem = this.gymItemRepository.create(createGymItemDto);
      const savedGymItem = await this.gymItemRepository.save(newGymItem);

      return {
        success: true,
        message: "Gym item created successfully",
        data: savedGymItem,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: (error as Error).message,
      };
    }
  }

  async findAll() {
    try {
      const gymItems = await this.gymItemRepository.find();
      return {
        success: true,
        message: "Gym items fetched successfully",
        data: gymItems,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: (error as Error).message,
      };
    }
  }

  async update(id: string, updateGymItemDto: UpdateGymItemDto) {
    try {
      const ZodGymItem = z.object({
        name: z.string().optional(),
        details: z.string().optional(),
        price: z.number().min(0).optional(),
        isFavorite: z.boolean().optional(),
      });
      const parsed = ZodGymItem.safeParse(updateGymItemDto);
      if (!parsed.success) {
        return {
          success: false,
          message: "Invalid gym item data",
          errors: parsed.error,
        };
      }

      //IS THIS NECCESARY?
      const gymItem = await this.gymItemRepository.findOne({ where: { id } });
      if (!gymItem) {
        return {
          success: false,
          message: "Gym item not found",
        };
      }

      await this.gymItemRepository.update(id, updateGymItemDto);
      const updatedGymItem = await this.gymItemRepository.findOne({
        where: { id },
      });

      return {
        success: true,
        message: "Gym item updated successfully",
        data: updatedGymItem,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: (error as Error).message,
      };
    }
  }

  async remove(id: string) {
    try {
      const gymItem = await this.gymItemRepository.findOne({ where: { id } });
      if (!gymItem) {
        return {
          success: false,
          message: "Gym item not found",
        };
      }
      await this.gymItemRepository.remove(gymItem);
      return {
        success: true,
        message: "Gym item removed successfully",
        data: gymItem,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: (error as Error).message,
      };
    }
  }

  // async findOne(id: string) {
  //   return await this.gymItemRepository.findOne({ where: { id } });
  // }
}
