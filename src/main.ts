import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // if you need cookies/auth headers
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
