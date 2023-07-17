import { Module } from '@nestjs/common';
import { IacTaskService } from './iac-task.service';
import { IacTaskController } from './iac-task.controller';

@Module({
  controllers: [IacTaskController],
  providers: [IacTaskService]
})
export class IacTaskModule {}
