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
          app_config: JSON.stringify(applicationConfig),
          app_id: applicationId,
        },
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }
}
