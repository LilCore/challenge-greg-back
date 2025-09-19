import { PartialType } from "@nestjs/mapped-types";
import { CreateGymItemDto } from "./create-gym-item.dto";

export class UpdateGymItemDto extends PartialType(CreateGymItemDto) {}
