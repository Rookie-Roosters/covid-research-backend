import { PartialType } from '@nestjs/swagger';
import { CreateSourceRegisterDto } from './create-source-register.dto';

export class UpdateSourceRegisterDto extends PartialType(
  CreateSourceRegisterDto,
) {}
