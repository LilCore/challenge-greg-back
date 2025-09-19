import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthenticateUserDto } from "./dto/authenticate-user.dto";
import { JwtAuthGuard } from "src/guards/JwtAuthGuard";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("authenticate")
  authenticate(@Body() authenticateUserDto: AuthenticateUserDto) {
    return this.userService.authenticate(authenticateUserDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
