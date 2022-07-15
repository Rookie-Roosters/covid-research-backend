import { PickType } from '@nestjs/swagger';
import { SearchDto } from './search.dto';

export class SearchCreateDto extends PickType(SearchDto, [] as const) {}
