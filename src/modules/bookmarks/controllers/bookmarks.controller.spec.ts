import { BookmarksService } from '@bookmarks/services';
import { Test, TestingModule } from '@nestjs/testing';
import { BookmarksController } from './bookmarks.controller';

describe('BookmarksController', () => {
    let controller: BookmarksController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BookmarksController],
            providers: [BookmarksService],
        }).compile();

        controller = module.get<BookmarksController>(BookmarksController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
