import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesGuard } from './utils/roles/roles.guard';
import { DBModule } from './config/db.module';
import { ProductModule } from './api/product/product.module';
import { UserModule } from './api/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { 
          expiresIn: configService.get<string>('JWT_EXPIRY'),
        },
      }),
      inject: [ConfigService],
    }),
    DBModule,
    ProductModule,
    UserModule,
   
  ],
  controllers: [AppController],
  providers: [AppService,RolesGuard
  ],
})
export class AppModule {}
