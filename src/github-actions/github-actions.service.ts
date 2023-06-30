import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';

const {
  GITHUB_USER_NAME: owner = '',
  GITHUB_REPO_NAME: repo = '',
  GITHUB_TOKEN: auth = '',
} = process.env;

export const exampleConfig = {
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

export const exampleAppId = '024b8e6a-53d1-4c1a-8c28-6862938b73cd';

@Injectable()
export class GithubActionsService {
  private octokit: Octokit;

  constructor() {
    this.octokit = new Octokit({ auth });
  }

  async triggerApplyWorkflow(
    applications: { [key: string]: any },
    applicationId: string,
  ) {
    try {
      const workflow_id = 'terraform_apply.yml';
      const ref = 'main';
      console.log({ owner, repo, workflow_id, ref });
      const response = await this.octokit.actions.createWorkflowDispatch({
        owner,
        repo,
        workflow_id,
        ref,
        inputs: {
          app_config: JSON.stringify(exampleConfig),
          app_id: applicationId,
        },
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }
}
