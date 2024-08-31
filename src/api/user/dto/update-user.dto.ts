import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto  {
     @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    email: string;
}
