import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthenticateUserDto } from "./dto/authenticate-user.dto";
import * as CryptoJS from "crypto-js";

@Injectable()
export class UserService {
  authenticate(authenticateUserDto: AuthenticateUserDto) {
    try {
      // authenticateUserDto.email;
      // authenticateUserDto.password
      //HERE LOOK FOR USER AND COMPARE PASSWORD

      const secretKey = process.env.JWT_BEARER_TOKEN_SECRET_KEY;
      const payloadString = JSON.stringify(authenticateUserDto);
      console.log(payloadString);

      const encryptedPayload: string = CryptoJS.AES.encrypt(
        payloadString,
        secretKey,
      ).toString();

      return {
        success: true,
        message: "User authenticated succesfully!",
        data: {
          // ...data,
          token: encryptedPayload,
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

  create(createUserDto: CreateUserDto) {
    return "This action adds a new user";
  }
}
