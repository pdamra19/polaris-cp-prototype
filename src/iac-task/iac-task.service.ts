import {
  ECSClient,
  RunTaskCommand,
  RunTaskCommandInput,
} from '@aws-sdk/client-ecs';
import { Injectable } from '@nestjs/common';
import { CreateIacTaskDto } from './dto/create-iac-task.dto';
import { UpdateIacTaskDto } from './dto/update-iac-task.dto';

const {
  AWS_REGION: region = '',
  ECS_CLUSTER: cluster = '',
  IAC_TASK_DEFINITION: taskDefinition = '',
  VPC_SUBNETS: vpcSubnets = '', // comma separated list of subnets
} = process.env;

@Injectable()
export class IacTaskService {
  private readonly ecsClient: ECSClient;

  constructor() {
    this.ecsClient = new ECSClient({ region });
  }

  create(createIacTaskDto: CreateIacTaskDto) {
    return 'This action adds a new iacTask';
  }

  findAll() {
    return `This action returns all iacTask`;
  }

  findOne(id: number) {
    return `This action returns a #${id} iacTask`;
  }

  update(id: number, updateIacTaskDto: UpdateIacTaskDto) {
    return `This action updates a #${id} iacTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} iacTask`;
  }

  async runTask() {
    const params: RunTaskCommandInput = {
      cluster,
      taskDefinition,
      launchType: 'FARGATE',
      networkConfiguration: {
        awsvpcConfiguration: {
          subnets: vpcSubnets.split(',').map((subnet) => subnet.trim()),
        },
      },
    };

    try {
      const response = await this.ecsClient.send(new RunTaskCommand(params));
      console.log('Task started: %j', response);
      return response;
    } catch (e) {
      console.error(e);
      console.error(params);
    }
  }
}
