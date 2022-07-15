import { PickType } from '@nestjs/swagger';
import { BookmarkDto } from './bookmark.dto';

export class BookmarkCreateDto extends PickType(BookmarkDto, [] as const) {}
