import { Test, TestingModule } from '@nestjs/testing';
import { IacTaskController } from './iac-task.controller';
import { IacTaskService } from './iac-task.service';

describe('IacTaskController', () => {
  let controller: IacTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IacTaskController],
      providers: [IacTaskService],
    }).compile();

    controller = module.get<IacTaskController>(IacTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
