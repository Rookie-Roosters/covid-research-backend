import { Test, TestingModule } from '@nestjs/testing';
import { ResearchesService } from './researches.service';

describe('ResearchesService', () => {
  let service: ResearchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResearchesService],
    }).compile();

    service = module.get<ResearchesService>(ResearchesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
