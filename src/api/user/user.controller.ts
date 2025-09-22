import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthenticateUserDto } from "./dto/authenticate-user.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("authenticate")
  authenticate(@Body() authenticateUserDto: AuthenticateUserDto) {
    return this.userService.authenticate(authenticateUserDto);
  }

  @Post("sign-up")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }
}
