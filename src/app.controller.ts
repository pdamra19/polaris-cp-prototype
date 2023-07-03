import { Controller, Delete, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GithubActionsService } from './github-actions/github-actions.service';

const exampleAppConfig = {
  Vectar: {
    component_id: 'viz1',
    instance_type: 't2.micro',
    ami: 'ami-003d3d03cfe1b0468',
  },
  Chyron: {
    component_id: 'chyron1',
    instance_type: 't2.micro',
    ami: 'ami-003d3d03cfe1b0468',
  },
  TagVS: {
    component_id: 'tagvs1',
    instance_type: 't2.micro',
    ami: 'ami-003d3d03cfe1b0468',
  },
  Telos: {
    component_id: 'telos1',
    instance_type: 't2.micro',
    ami: 'ami-003d3d03cfe1b0468',
  },
};

const exampleApplicationId = '32d6bdcd-28b2-4a1f-8f3e-b6cbd6e2fd8d';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly ghActionsService: GithubActionsService,
  ) {}

  @Get()
  async getHello(): Promise<Record<string, Record<string, string>>> {
    await this.ghActionsService.triggerApplyWorkflow(
      exampleAppConfig,
      exampleApplicationId,
    );
    return exampleAppConfig;
  }

  @Delete()
  async getGoodbye(): Promise<Record<string, Record<string, string>>> {
    await this.ghActionsService.triggerDestroyWorkflow(
      exampleAppConfig,
      exampleApplicationId,
    );
    return exampleAppConfig;
  }
}
