import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule, ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          replication: {
            master: {
              host: configService.get('DB_HOST'),
              port: +configService.get<number>('DB_PORT'),
              username: configService.get('DB_USER'),
              password: configService.get('DB_PASS'),
              database: configService.get('DB_NAME'),
            },
            slaves: [],
            selector: 'RR',
            canRetry: true,
            removeNodeErrorCount: 5,
            restoreNodeTimeout: 1000,
          },
          autoLoadEntities: true,
          synchronize: configService.get('DB_SYNC'),
          logging: configService.get('DB_LOG'),
          entities: ['dist/api/**/*.entity.js'],
          cli: {
            entitiesDir: 'src/api/**/*.entity.ts',
          },
        
          namingStrategy: new SnakeNamingStrategy(),
          poolSize: 20,
        }),
        inject: [ConfigService],
      }),
  ]
})
export class DBModule {}