import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: "User's unique identifier" })
  @IsString({ message: 'username must be a valid string.' })
  username: string;

  @ApiProperty({ description: "User's email" })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;
}
