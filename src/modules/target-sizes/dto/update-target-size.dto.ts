import { PartialType } from '@nestjs/swagger';
import { CreateTargetSizeDto } from './create-target-size.dto';

export class UpdateTargetSizeDto extends PartialType(CreateTargetSizeDto) {}
