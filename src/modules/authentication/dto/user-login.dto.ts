import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '@users/entities';
import { IsValidPassword } from '@utils/decorators';

export class UserLogInDto extends PickType(User, ['email'] as const) {
    @ApiProperty({ description: "User's account access password" })
    @IsValidPassword()
    password: string;
}
