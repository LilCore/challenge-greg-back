import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthenticateUserDto } from "./dto/authenticate-user.dto";
import CryptoJS from "crypto-js";
import * as z from "zod";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    try {
      // ZOD VALIDATION
      const ZodUser = z.object({
        name: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      });
      const parsed = ZodUser.safeParse(createUserDto);
      if (!parsed.success) {
        return {
          success: false,
          message: "Invalid user data",
          errors: parsed.error,
        };
      }

      //HASH PASSWORD
      const hashedPassword = CryptoJS.PBKDF2(
        createUserDto.password ?? "",
        process.env.PBKDF2_SALT ?? "",
      ).toString();

      //INSERT USER
      const newUser = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
      const savedUser = await this.userRepository.save(newUser);
      console.log("savedUser", savedUser);

      //GENERATE TOKEN
      const secretKey = process.env.JWT_BEARER_TOKEN_SECRET_KEY ?? "";
      const payloadString = JSON.stringify(savedUser);
      const token: string = CryptoJS.AES.encrypt(
        payloadString,
        secretKey,
      ).toString();

      return {
        success: true,
        message: "User created successfully",
        data: {
          user: savedUser,
          token,
        },
      };
    } catch (error: unknown) {
      console.log(error);
      return {
        success: false,
        message: (error as Error).message,
      };
    }
  }

  async authenticate(authenticateUserDto: AuthenticateUserDto) {
    try {
      const u = await this.userRepository.findOne({
        where: { email: authenticateUserDto.email },
      });
      if (!u) throw new Error("User not found");

      //HASH PASSWORD
      const hashedPassword = CryptoJS.PBKDF2(
        authenticateUserDto.password ?? "",
        process.env.PBKDF2_SALT ?? "",
      ).toString();

      if (u.password !== hashedPassword) throw new Error("Invalid password");

      //GENERATE TOKEN
      const secretKey = process.env.JWT_BEARER_TOKEN_SECRET_KEY ?? "";
      const payloadString = JSON.stringify(u);
      const token: string = CryptoJS.AES.encrypt(
        payloadString,
        secretKey,
      ).toString();

      return {
        success: true,
        message: "User authenticated succesfully!",
        data: {
          user: u,
          token,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error.message as string,
      };
    }
  }
}
