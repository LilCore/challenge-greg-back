import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import CryptoJS from "crypto-js";

interface JwtPayload {
  email?: string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req: Request = context.getArgByIndex(0);
      // const res: Response = context.getArgByIndex(1);

      const headers = req?.headers as Headers & { authorization: string };
      const authorization: string = headers?.authorization ?? "";
      const token = authorization.replace("Bearer ", "");
      const secretKey = process.env.JWT_BEARER_TOKEN_SECRET_KEY ?? "";

      console.log("GUARD", { token, secretKey });

      // Ensure the token is a valid base64 string before decrypting
      const decryptedData = CryptoJS.AES.decrypt(token, secretKey);
      const decryptedDataString = CryptoJS.enc.Utf8.stringify(decryptedData);

      if (!decryptedDataString) {
        throw new UnauthorizedException("Invalid or expired token");
      }

      // Optionally, you can parse the decrypted string if it's JSON

      let payload: JwtPayload;
      try {
        payload = JSON.parse(decryptedDataString) as JwtPayload;
      } catch {
        throw new UnauthorizedException("Malformed token payload");
      }

      // console.log(payload);

      // You can add more checks here, e.g., expiration, user id, etc.
      if (!payload || !payload.email) {
        throw new UnauthorizedException("Invalid token payload");
      }

      return Promise.resolve(true);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(error);
    }
  }
}
