import { PartialType, PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UserUpdateDto extends PartialType(PickType(UserDto, ['firstName', 'lastName'] as const)) {}
