import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { GymItemService } from "./gym-item.service";
import { CreateGymItemDto } from "./dto/create-gym-item.dto";
import { UpdateGymItemDto } from "./dto/update-gym-item.dto";
import { JwtAuthGuard } from "src/guards/JwtAuthGuard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Gym Item")
@ApiBearerAuth()
@Controller("gym-item")
export class GymItemController {
  constructor(private readonly gymItemService: GymItemService) {}

  @Post("create")
  @UseGuards(JwtAuthGuard)
  create(@Body() createGymItemDto: CreateGymItemDto) {
    return this.gymItemService.create(createGymItemDto);
  }

  // @Get("get-all")
  // @UseGuards(JwtAuthGuard)
  // findAll() {
  //   return this.gymItemService.findAll();
  // }

  @Get("get-all/:id")
  @UseGuards(JwtAuthGuard)
  findGymItems(@Param("id") id: string) {
    return this.gymItemService.findGymItems(id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() updateGymItemDto: UpdateGymItemDto) {
    return this.gymItemService.update(id, updateGymItemDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.gymItemService.remove(id);
  }

  // @Get(":id")
  // @UseGuards(JwtAuthGuard)
  // findOne(@Param("id") id: string) {
  //   return this.gymItemService.findOne(id);
  // }
}
