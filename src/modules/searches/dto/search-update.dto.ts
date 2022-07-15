import { PartialType, PickType } from '@nestjs/swagger';
import { SearchDto } from './search.dto';

export class SearchUpdateDto extends PartialType(PickType(SearchDto, [] as const)) {}
