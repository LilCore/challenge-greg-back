import { Module } from "@nestjs/common";
import { GymItemService } from "./gym-item.service";
import { GymItemController } from "./gym-item.controller";
import { GymItem } from "./entities/gym-item.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([GymItem])],
  controllers: [GymItemController],
  providers: [GymItemService],
})
export class GymItemModule {}
