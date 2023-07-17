import { Module } from '@nestjs/common';
import { GithubActionsController } from './github-actions.controller';
import { GithubActionsService } from './github-actions.service';

@Module({
  providers: [GithubActionsService],
  exports: [GithubActionsService],
  controllers: [GithubActionsController],
})
export class GithubActionsModule {}
