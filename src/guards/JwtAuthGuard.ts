import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
// import { promisify } from 'util';
// import { GetVerificationKey, expressjwt } from 'express-jwt';
// import { expressJwtSecret } from 'jwks-rsa';
import * as CryptoJS from "crypto-js";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const req = context.getArgByIndex(0);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const res = context.getArgByIndex(1);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const authorization: string = (req?.headers?.authorization ??
        "") as string;

      const token = authorization.replace("Bearer ", "");
      // Decrypt the token using the secret key

      console.log({ token });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const decryptedData = CryptoJS.AES.decrypt(
        token,
        process.env.JWT_BEARER_TOKEN_SECRET_KEY,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      );

      // console.log({ decryptedData });
      const decryptedDataString = decryptedData.toString(CryptoJS.enc.Utf8);
      // console.log({ decryptedDataString });

      if (!decryptedDataString) {
        throw new UnauthorizedException("Invalid or expired token");
      }

      // Optionally, you can parse the decrypted string if it's JSON
      let payload: any;
      try {
        payload = JSON.parse(decryptedDataString);
      } catch {
        throw new UnauthorizedException("Malformed token payload");
      }

      console.log(payload);

      // You can add more checks here, e.g., expiration, user id, etc.
      if (!payload || !payload.email) {
        throw new UnauthorizedException("Invalid token payload");
      }

      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(error);
    }
  }
}
