import { PartialType } from '@nestjs/swagger';
import { CreateTargetSizeGroupDto } from './create-target-size-group.dto';

export class UpdateTargetSizeGroupDto extends PartialType(
  CreateTargetSizeGroupDto,
) {}
