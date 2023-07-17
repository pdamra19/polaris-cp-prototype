import { Controller, Delete, Post } from '@nestjs/common';
import { GithubActionsService } from './github-actions.service';

export const exampleAppConfig = {
  Vectar: {
    Primary: {
      component_id: 'viz1',
      instance_type: 't2.micro',
      ami: 'ami-003d3d03cfe1b0468',
    },
    Secondary: {
      component_id: 'viz2',
      instance_type: 't2.micro',
      ami: 'ami-003d3d03cfe1b0468',
    },
  },
  Chyron: {
    Chyron1: {
      component_id: 'chyron1',
      instance_type: 't2.micro',
      ami: 'ami-003d3d03cfe1b0468',
    },
    Chyron2: {
      component_id: 'chyron2',
      instance_type: 't2.micro',
      ami: 'ami-003d3d03cfe1b0468',
    },
  },
  TagVS: {
    Manager: {
      component_id: 'tagvs1',
      instance_type: 't2.micro',
      ami: 'ami-003d3d03cfe1b0468',
    },
    Worker: {
      component_id: 'tagvs2',
      instance_type: 't2.micro',
      ami: 'ami-003d3d03cfe1b0468',
    },
  },
  Telos: {
    Application: {
      component_id: 'telos1',
      instance_type: 't2.micro',
      ami: 'ami-003d3d03cfe1b0468',
    },
    License: {
      component_id: 'telos2',
      instance_type: 't2.micro',
      ami: 'ami-003d3d03cfe1b0468',
    },
  },
};

const exampleApplicationId = '32d6bdcd-28b2-4a1f-8f3e-b6cbd6e2fd8d';

@Controller('github-actions')
export class GithubActionsController {
  constructor(private readonly ghActionsService: GithubActionsService) {}

  @Post()
  async createDeployment(): Promise<
    Record<string, Record<string, Record<string, string>>>
  > {
    await this.ghActionsService.triggerApplyWorkflow(
      exampleAppConfig,
      exampleApplicationId,
    );
    return exampleAppConfig;
  }

  @Delete()
  async destroyDeployment(): Promise<
    Record<string, Record<string, Record<string, string>>>
  > {
    await this.ghActionsService.triggerDestroyWorkflow(
      exampleAppConfig,
      exampleApplicationId,
    );
    return exampleAppConfig;
  }
}
