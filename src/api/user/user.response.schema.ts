import { ApiProperty } from "@nestjs/swagger";

export class Message {
  @ApiProperty({ example: 'successful' })
  message: string;

  @ApiProperty({ example: true })
  status: boolean;
}

export class UserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;
}

export class AllUserData {
  @ApiProperty({ type: [UserDto] })
  data: UserDto[];
}

export class UserData {
  @ApiProperty({ type: UserDto })
  data: UserDto;
}

export class LoginUserData {
  @ApiProperty({ type: UserDto })
  data: UserDto;

  @ApiProperty({ example: "some-generated-token" })
  token: string;
}

export class UpdateInfo {
  @ApiProperty({ example: [] })
  generatedMaps: any[]
  @ApiProperty({ example: [] })
  raw: any[]
  @ApiProperty({ example: 1 })
  affected: 1

}

export class UpdateData {
  @ApiProperty({ type: UpdateInfo })
  data: UpdateInfo

}

export class FindAllResponseDto {

  @ApiProperty({ example: 'Get all user' })
  title: string;

  @ApiProperty({ type: Message })
  message: Message

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ type: AllUserData })
  data: AllUserData;
}

export class FindUserDetailResponseDto {

  @ApiProperty({ example: 'Get user by id' })
  title: string;

  @ApiProperty({ type: Message })
  message: Message

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ type: UserData })
  data: UserData;
}

export class LoginResponseDto {

  @ApiProperty({ example: 'Login' })
  title: string;

  @ApiProperty({ type: Message })
  message: Message

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ type: LoginUserData })
  data: LoginUserData;
}

export class SignUpResponseDto {

  @ApiProperty({ example: 'Sign up' })
  title: string;

  @ApiProperty({ type: Message })
  message: Message

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ type: UserData })
  data: UserData;
}

export class UpdateResponseDto {

  @ApiProperty({ example: 'Update' })
  title: string;

  @ApiProperty({ type: Message })
  message: Message

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ type: UpdateData })
  data: UpdateData;
}

export class DeleteResponseDto {

  @ApiProperty({ example: 'Delete' })
  title: string;

  @ApiProperty({ type: Message })
  message: Message

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ type: UpdateData })
  data: UpdateData;
}