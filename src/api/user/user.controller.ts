import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, CreateUserLoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/utils/roles/roles.enum';
import { UseAuthGuard } from '../../utils/jwt/use.auth.guard';

@ApiTags('User Management')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: CreateUserLoginDto) {
    return this.userService.login(loginDto);
  }

  @Get()
  @UseAuthGuard(Role.Admin)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseAuthGuard(Role.Admin, Role.User)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put('status/:id')
  @UseAuthGuard(Role.Admin)
  banAndUnbanUser(@Param('id') id: string) {
    return this.userService.banAndUnbanUser(+id);
  }

  @Patch(':id')
  @UseAuthGuard(Role.User)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }


  @Delete(':id')
  @UseAuthGuard(Role.Admin)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
