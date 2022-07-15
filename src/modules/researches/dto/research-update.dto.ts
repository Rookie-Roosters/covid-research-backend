import { PartialType, PickType } from '@nestjs/swagger';
import { ResearchDto } from './research.dto';

export class ResearchUpdateDto extends PartialType(PickType(ResearchDto, [] as const)) {}
