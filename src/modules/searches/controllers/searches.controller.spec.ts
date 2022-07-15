import { Test, TestingModule } from '@nestjs/testing';
import { SearchesService } from '@searches/services';
import { SearchesController } from './searches.controller';

describe('SearchesController', () => {
    let controller: SearchesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SearchesController],
            providers: [SearchesService],
        }).compile();

        controller = module.get<SearchesController>(SearchesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
