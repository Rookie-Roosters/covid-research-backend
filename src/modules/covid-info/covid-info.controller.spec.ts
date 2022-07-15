import { Test, TestingModule } from '@nestjs/testing';
import { CovidInfoController } from './covid-info.controller';
import { CovidInfoService } from './covid-info.service';

describe('CovidInfoController', () => {
  let controller: CovidInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CovidInfoController],
      providers: [CovidInfoService],
    }).compile();

    controller = module.get<CovidInfoController>(CovidInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
