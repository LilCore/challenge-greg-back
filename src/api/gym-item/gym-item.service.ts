import { Injectable } from "@nestjs/common";
import { CreateGymItemDto } from "./dto/create-gym-item.dto";
import { UpdateGymItemDto } from "./dto/update-gym-item.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GymItem } from "./entities/gym-item.entity";

@Injectable()
export class GymItemService {
  constructor(
    @InjectRepository(GymItem)
    private readonly gymItemRepository: Repository<GymItem>,
  ) {}

  async create(createGymItemDto: CreateGymItemDto) {
    console.log("create");
    const newGymItem = this.gymItemRepository.create(createGymItemDto);
    return await this.gymItemRepository.save(newGymItem);
  }

  async findAll() {
    return await this.gymItemRepository.find();
  }

  async findOne(id: string) {
    return await this.gymItemRepository.findOne({ where: { id } });
  }

  async update(id: string, updateGymItemDto: UpdateGymItemDto) {
    await this.gymItemRepository.update(id, updateGymItemDto);
    return await this.gymItemRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const gymItem = await this.gymItemRepository.findOne({ where: { id } });
    if (gymItem) {
      await this.gymItemRepository.remove(gymItem);
    }
    return gymItem;
  }
}
