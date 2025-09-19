import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GymItemModule } from "./api/gym-item/gym-item.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import configuration from "./config/configuration";
import { UserModule } from "./api/user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      // envFilePath: `.env.${process.env.NODE_ENV}`,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: "postgres",
          url: configService.get<string>("database.URI"),
          entities: [__dirname + "/**/*.entity{.ts,.js}"],
          // autoLoadEntities: true,
          synchronize: true, //DEVELOPMENT ONLY
        };
      },
    }),
    GymItemModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
