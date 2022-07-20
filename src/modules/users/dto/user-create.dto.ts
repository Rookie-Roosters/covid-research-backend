import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '@users/entities';
import { IsValidPassword, Match } from '@utils/decorators';

export class UserCreateDto extends PickType(User, ['firstName', 'lastName', 'email'] as const) {
    @ApiProperty({ description: "User's account access password" })
    @IsValidPassword()
    password: string;

    @ApiProperty({ description: "Repeat User's account access password" })
    @Match('password')
    confirmPassword: string;
}
