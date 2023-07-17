import { Test, TestingModule } from '@nestjs/testing';
import { IacTaskService } from './iac-task.service';

describe('IacTaskService', () => {
  let service: IacTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IacTaskService],
    }).compile();

    service = module.get<IacTaskService>(IacTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
