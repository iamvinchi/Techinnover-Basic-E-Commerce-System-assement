import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Authutil } from 'src/utils/auth.helper';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService, Authutil],
})
export class UserModule {}
