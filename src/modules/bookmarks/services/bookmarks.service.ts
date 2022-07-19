import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookmarkCreateDto, BookmarkUpdateDto } from '@bookmarks/dto';
import { Bookmark } from '@bookmarks/entities';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class BookmarksService {
    constructor(
        @InjectRepository(Bookmark)
        private bookmarksRepository: Repository<Bookmark>,
    ) {}

    create(createBookmarkDto: BookmarkCreateDto): Promise<Bookmark> {
        const bookmark = this.bookmarksRepository.save(createBookmarkDto as Bookmark);
        return bookmark;
    }

    findAll(): Promise<Bookmark[]> {
        const bookmarks = this.bookmarksRepository.find();
        return bookmarks;
    }

    findOne(id: number): Promise<Bookmark> {
        const bookmark = this.bookmarksRepository.findOneBy({ id });
        return bookmark;
    }

    update(id: number, bookmarkUpdateDto: BookmarkUpdateDto): Promise<Bookmark> {
        const bookmark = this.bookmarksRepository.save({ id, ...bookmarkUpdateDto } as Bookmark);
        return bookmark;
    }

    async remove(id: number): Promise<DeleteResult> {
        const deleted = await this.bookmarksRepository.delete(id);
        return deleted;
    }
}
