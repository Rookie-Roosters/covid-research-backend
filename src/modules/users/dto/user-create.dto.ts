import { PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UserCreateDto extends PickType(UserDto, ['firstName', 'lastName', 'email', 'password'] as const) {}
