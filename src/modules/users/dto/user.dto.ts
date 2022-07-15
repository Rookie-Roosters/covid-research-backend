import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsBoolean, IsEmail, IsInt, IsPositive, Length, MaxLength } from 'class-validator';

export class UserDto {
    @ApiProperty({ description: "User's primary key" })
    @IsInt()
    @IsPositive()
    id: number;

    @ApiProperty({ description: "User's login email" })
    @IsEmail()
    @MaxLength(64)
    email: string;

    @ApiProperty({ description: "User's first name" })
    @Length(1, 32)
    firstName: string;

    @ApiProperty({ description: "User's last name" })
    @Length(1, 32)
    lastName: string;

    @ApiProperty({ description: "User's login password" })
    @IsAlphanumeric()
    @Length(8, 32)
    password: string;

    @ApiProperty({ description: 'Whether user has Admin permissions' })
    @IsBoolean()
    isAdmin: boolean;
}
