import { PartialType } from '@nestjs/swagger';
import { CreateIacTaskDto } from './create-iac-task.dto';

export class UpdateIacTaskDto extends PartialType(CreateIacTaskDto) {}
