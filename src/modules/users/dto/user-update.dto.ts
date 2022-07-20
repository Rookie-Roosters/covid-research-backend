import { PartialType, PickType } from '@nestjs/swagger';
import { User } from '@users/entities';

export class UserUpdateDto extends PartialType(PickType(User, ['firstName', 'lastName'] as const)) {}
