import { USER_ROLE, USER_ROLE_VALUES } from '@authentication/constants';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '@users/entities';
import { IsValidPassword } from '@utils/decorators';
import { ArrayNotEmpty, IsIn } from 'class-validator';

export class UserCreateDto extends PickType(User, ['firstName', 'lastName', 'email'] as const) {
    @ApiProperty({ description: "User's account access password" })
    @IsValidPassword()
    password: string;

    @ApiProperty({ description: "User's permission roles", enum: USER_ROLE, isArray: true })
    @ArrayNotEmpty()
    @IsIn(USER_ROLE_VALUES, { each: true })
    roles: string[];
}
