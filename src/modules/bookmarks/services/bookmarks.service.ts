import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookmarkCreateDto, BookmarkUpdateDto, BookmarkUpdateResearchDto } from '@bookmarks/dto';
import { Bookmark } from '@bookmarks/entities';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '@users/entities';
import { BookmarkResponseDto } from '@bookmarks/dto/bookmark-response.dto';
import { ResearchesService } from '@researches/services/researches.service';
import { CompactResponseResearchDto } from '@researches/dto/responses';

@Injectable()
export class BookmarksService {
    constructor(
        private researchesService: ResearchesService,
        @InjectRepository(Bookmark)
        private bookmarksRepository: Repository<Bookmark>,
    ) {}

    bookmarkToResponse(bookmark: Bookmark): BookmarkResponseDto {
        const researches: CompactResponseResearchDto[] = [];
        if (bookmark.researches) {
            bookmark.researches.map((research) => {
                researches.push({
                    id: research.id,
                    publicTitle: research.publicTitle,
                    views: research.views,
                    lastRefreshedOn: research.lastRefreshedOn,
                    primarySponsor: research.primarySponsor,
                    webAddress: research.webAddress,
                });
            });
        }
        return {
            id: bookmark.id,
            name: bookmark.name,
            color: bookmark.color,
            researches: researches,
        };
    }

    private async exists(id: number, user: User): Promise<boolean> {
        const count = await this.bookmarksRepository.count({
            where: {
                id: id,
                user: {
                    id: user.id,
                },
            },
        });
        if (count == 0) return false;
        return true;
    }

    async create(createBookmarkDto: BookmarkCreateDto, user: User): Promise<BookmarkResponseDto> {
        const bookmark = await this.bookmarksRepository.save({
            name: createBookmarkDto.name,
            color: createBookmarkDto.color,
            user: user,
        });
        return this.bookmarkToResponse(bookmark);
    }

    async findOne(id: number, user: User): Promise<BookmarkResponseDto> {
        if (await this.exists(id, user)) {
            const bookmark = await this.bookmarksRepository.findOne({
                where: {
                    id,
                    user: {
                        id: user.id,
                    },
                },
                relations: {
                    researches: true,
                },
            });
            return this.bookmarkToResponse(bookmark);
        } else throw new NotFoundException('Bookmark not found');
    }

    async findByUser(user: User): Promise<BookmarkResponseDto[]> {
        let bookmarksResponse: BookmarkResponseDto[] = [];
        const bookmarks = await this.bookmarksRepository.find({
            where: {
                user: {
                    id: user.id,
                },
            },
            relations: {
                researches: true,
            },
        });
        bookmarks.map((bookmark) => {
            bookmarksResponse.push(this.bookmarkToResponse(bookmark));
        });
        return bookmarksResponse;
    }

    async updateOne(id: number, bookmarkUpdateDto: BookmarkUpdateDto, user: User): Promise<BookmarkResponseDto> {
        if (await this.exists(id, user)) {
            await this.bookmarksRepository.update(id, {
                name: bookmarkUpdateDto.name,
                color: bookmarkUpdateDto.color,
            });
            return this.findOne(id, user);
        } else throw new NotFoundException('Bookmark not found');
    }

    async removeOne(id: number, user: User): Promise<DeleteResult> {
        if (await this.exists(id, user)) {
            const deleted = await this.bookmarksRepository.delete(id);
            return deleted;
        } else throw new NotFoundException('Bookmark not found');
    }

    async addResearch(id: number, bookmarkUpdateResearchDto: BookmarkUpdateResearchDto, user: User): Promise<BookmarkResponseDto> {
        if ((await this.exists(id, user)) && (await this.researchesService.existsId(bookmarkUpdateResearchDto.researchId))) {
            const research = await this.researchesService.findOneById(bookmarkUpdateResearchDto.researchId);
            let bookmark = await this.bookmarksRepository.findOne({ where: { id }, relations: { researches: true } });
            bookmark.researches.push(research);
            bookmark = await this.bookmarksRepository.save(bookmark);
            return this.bookmarkToResponse(bookmark);
        } else throw new NotFoundException('Neither Bookmark nor Research found');
    }

    async removeResearch(id: number, bookmarkUpdateResearchDto: BookmarkUpdateResearchDto, user: User): Promise<BookmarkResponseDto> {
        if ((await this.exists(id, user)) && (await this.researchesService.existsId(bookmarkUpdateResearchDto.researchId))) {
            const research = await this.researchesService.findOneById(bookmarkUpdateResearchDto.researchId);
            let bookmark = await this.bookmarksRepository.findOne({ where: { id }, relations: { researches: true } });
            await this.bookmarksRepository.createQueryBuilder().relation(Bookmark, 'researches').of(bookmark).remove(research);
            bookmark = await this.bookmarksRepository.findOne({ where: { id }, relations: { researches: true } });
            return this.bookmarkToResponse(bookmark);
        } else throw new NotFoundException('Neither Bookmark nor Research found');
    }
}
