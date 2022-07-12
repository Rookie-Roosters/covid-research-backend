import { Test, TestingModule } from '@nestjs/testing';
import { ResearchesController } from './researches.controller';
import { ResearchesService } from './researches.service';

describe('ResearchesController', () => {
  let controller: ResearchesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResearchesController],
      providers: [ResearchesService],
    }).compile();

    controller = module.get<ResearchesController>(ResearchesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
