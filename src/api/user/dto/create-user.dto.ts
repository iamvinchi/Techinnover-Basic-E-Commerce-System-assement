import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches } from "class-validator";

export enum Role {
    User = 'user',
    Admin = 'admin'
  }

const passwordRegEx =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  

export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty({ message: 'Role can not be empty' })
    @IsEnum(Role, { message: 'Role must be either user or admin' })
    @ApiProperty({ enum: Role })
    role: string;

    @IsString()
    @IsNotEmpty({ message: 'Name can not be empty' })
    @ApiProperty()
    name: string;

    @IsNotEmpty({ message: 'Email cannot be empty' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    @Matches(passwordRegEx, {
      message: `Password must contain Minimum 8 and maximum 20 characters,at least one uppercase letter,one lowercase letter,one number and one special character`,
    })
    password: string;

    @IsNotEmpty()
    @ApiProperty()
    @Matches(passwordRegEx, {
      message: `Confirm password must contain Minimum 8 and maximum 20 characters,at least one uppercase letter,one lowercase letter,one number and one special character`,
    })
    confirmPassword: string
}

export class CreateUserLoginDto {

    @IsNotEmpty({ message: 'Email cannot be empty' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    @Matches(passwordRegEx, {
      message: `Password must contain Minimum 8 and maximum 20 characters,at least one uppercase letter,one lowercase letter,one number and one special character`,
    })
    password: string;

}
