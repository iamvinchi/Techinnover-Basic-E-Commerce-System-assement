import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, CreateUserLoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/utils/roles/roles.enum';
import { UseAuthGuard } from '../../utils/jwt/use.auth.guard';
import { DeleteResponseDto, FindAllResponseDto, FindUserDetailResponseDto, LoginResponseDto, SignUpResponseDto, UpdateResponseDto } from './user.response.schema';

@ApiTags('User Management')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiOperation({ summary: 'This creates an account, either as a user or admin.' })
  @ApiResponse({ status: 200, description: 'Sign up response', type:SignUpResponseDto })
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Logs the user or admin into the system if the account is not banned.' })
  @ApiResponse({ status: 200, description: 'Login response', type:LoginResponseDto })
  login(@Body() loginDto: CreateUserLoginDto) {
    return this.userService.login(loginDto);
  }

  @Get()
  @UseAuthGuard(Role.Admin)
  @ApiOperation({ summary: 'Enables an admin to retrieve all users on the platform.' })
  @ApiResponse({ status: 200, description: 'Find all user response', type: FindAllResponseDto })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseAuthGuard(Role.Admin, Role.User)
  @ApiOperation({ summary: 'Gets a user detail or profile by id. Accessed by both the user and admin.' })
  @ApiResponse({ status: 200, description: 'Get user detail', type:FindUserDetailResponseDto })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put('status/:id')
  @UseAuthGuard(Role.Admin)
  @ApiOperation({ summary: 'This method enables an admin to ban or unban a user.' })
  @ApiResponse({ status: 200, description: 'Update status response', type:UpdateResponseDto })
  banAndUnbanUser(@Param('id') id: string) {
    return this.userService.banAndUnbanUser(+id);
  }

  @Patch(':id')
  @UseAuthGuard(Role.User)
  @ApiOperation({ summary: 'Allows a user to update his or her details.' })
  @ApiResponse({ status: 200, description: 'Update user response', type:UpdateResponseDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }


  @Delete(':id')
  @UseAuthGuard(Role.Admin)
  @ApiOperation({ summary: 'This method allows an admin to delete a user account.' })
  @ApiResponse({ status: 200, description: 'Delete user response', type:DeleteResponseDto})
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
