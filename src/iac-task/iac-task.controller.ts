import { RunTaskCommandOutput } from '@aws-sdk/client-ecs';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateIacTaskDto } from './dto/create-iac-task.dto';
import { UpdateIacTaskDto } from './dto/update-iac-task.dto';
import { IacTaskService } from './iac-task.service';

@Controller('iac-task')
export class IacTaskController {
  constructor(private readonly iacTaskService: IacTaskService) {}

  @Post()
  create(@Body() createIacTaskDto: CreateIacTaskDto) {
    return this.iacTaskService.create(createIacTaskDto);
  }

  @Get()
  findAll() {
    return this.iacTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iacTaskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIacTaskDto: UpdateIacTaskDto) {
    return this.iacTaskService.update(+id, updateIacTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iacTaskService.remove(+id);
  }

  @Post('run')
  async runTask(): Promise<RunTaskCommandOutput> {
    const response = await this.iacTaskService.runTask();
    return response;
  }
}
