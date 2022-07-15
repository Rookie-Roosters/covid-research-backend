import { Test, TestingModule } from '@nestjs/testing';
import { CovidInfoService } from './covid-info.service';

describe('CovidInfoService', () => {
  let service: CovidInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CovidInfoService],
    }).compile();

    service = module.get<CovidInfoService>(CovidInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
