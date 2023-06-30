import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  GithubActionsService,
  exampleAppId,
  exampleConfig,
} from './github-actions/github-actions.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly ghActionsService: GithubActionsService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    const response = this.appService.getHello();
    await this.ghActionsService.triggerApplyWorkflow(
      exampleConfig,
      exampleAppId,
    );
    return response;
  }
}
