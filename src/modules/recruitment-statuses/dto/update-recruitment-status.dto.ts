import { PartialType } from '@nestjs/swagger';
import { CreateRecruitmentStatusDto } from './create-recruitment-status.dto';

export class UpdateRecruitmentStatusDto extends PartialType(
  CreateRecruitmentStatusDto,
) {}
