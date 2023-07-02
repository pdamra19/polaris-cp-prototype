import { Controller, Delete, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GithubActionsService } from './github-actions/github-actions.service';

const exampleConfig = {
  VizVectar: {
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
  async getHello(): Promise<string> {
    const response = this.appService.getHello();

    await this.ghActionsService.triggerApplyWorkflow(
      exampleConfig,
      exampleApplicationId,
    );
    return response;
  }

  @Delete()
  async getGoodbye(): Promise<string> {
    await this.ghActionsService.triggerDestroyWorkflow(
      exampleConfig,
      exampleApplicationId,
    );
    const response = this.appService.getHello();
    return response;
  }
}
