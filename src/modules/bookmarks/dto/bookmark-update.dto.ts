import { PartialType, PickType } from '@nestjs/swagger';
import { BookmarkDto } from './bookmark.dto';

export class BookmarkUpdateDto extends PartialType(PickType(BookmarkDto, [] as const)) {}
