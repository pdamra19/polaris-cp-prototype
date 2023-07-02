import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';

const {
  GITHUB_USER_NAME: owner = '',
  GITHUB_REPO_NAME: repo = '',
  GITHUB_TOKEN: auth = '',
} = process.env;

@Injectable()
export class GithubActionsService {
  private octokit: Octokit;

  constructor() {
    this.octokit = new Octokit({ auth });
  }

  async triggerApplyWorkflow(
    applicationConfig: { [key: string]: any },
    applicationId: string,
    applicationEnvironment = 'aws',
  ) {
    try {
      const workflow_id = 'terraform_apply.yml';
      const ref = 'main';
      const response = await this.octokit.actions.createWorkflowDispatch({
        owner,
        repo,
        workflow_id,
        ref,
        inputs: {
          app_config: JSON.stringify(applicationConfig),
          app_env: applicationEnvironment,
          app_id: applicationId,
        },
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  async triggerDestroyWorkflow(
    applicationConfig: { [key: string]: any },
    applicationId: string,
    applicationEnvironment = 'aws',
  ) {
    try {
      const workflow_id = 'terraform_destroy.yml';
      const ref = 'main';
      const response = await this.octokit.actions.createWorkflowDispatch({
        owner,
        repo,
        workflow_id,
        ref,
        inputs: {
          app_config: JSON.stringify(applicationConfig),
          app_env: applicationEnvironment,
          app_id: applicationId,
        },
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }
}
