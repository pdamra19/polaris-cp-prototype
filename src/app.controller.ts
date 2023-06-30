import { Controller, Get } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AppService } from './app.service';
import { GithubActionsService } from './github-actions/github-actions.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly ghActionsService: GithubActionsService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    const response = this.appService.getHello();
    const exampleConfig = {
      VizVectar: {
        component_id: 'viz1',
        instance_type: 't2.micro',
        ami: 'ami-0abcdef1234567890',
      },
      Chyron: {
        component_id: 'chyron1',
        instance_type: 't2.micro',
        ami: 'ami-0abcdef1234567890',
      },
      TagVS: {
        component_id: 'tagvs1',
        instance_type: 't2.micro',
        ami: 'ami-0abcdef1234567890',
      },
      Telos: {
        component_id: 'telos1',
        instance_type: 't2.micro',
        ami: 'ami-0abcdef1234567890',
      },
    };
    await this.ghActionsService.triggerApplyWorkflow(exampleConfig, uuidv4());
    return response;
  }
}
