import { PartialType } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsBoolean()
  isAdmin: boolean;
}
