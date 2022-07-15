import { PickType } from '@nestjs/swagger';
import { ResearchDto } from './research.dto';

export class ResearchCreateDto extends PickType(ResearchDto, [] as const) {}
