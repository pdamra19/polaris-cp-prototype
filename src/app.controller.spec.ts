import { Test, TestingModule } from '@nestjs/testing';
import { AppController, exampleAppConfig } from './app.controller';
import { AppService } from './app.service';
import { GithubActionsModule } from './github-actions/github-actions.module';
import { GithubActionsService } from './github-actions/github-actions.service';

describe('AppController', () => {
  let appController: AppController;
  const githubService = {
    triggerApplyWorkflow: async () => Promise.resolve({}),
    triggerDestroyWorkflow: async () => Promise.resolve({}),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
      imports: [GithubActionsModule],
    })
      .overrideProvider(GithubActionsService)
      .useValue(githubService)
      .compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const result = await appController.getHello();
      expect(result).toMatchObject(exampleAppConfig);
    });
  });
});
