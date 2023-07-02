import { databases } from 'src/common/config/database.config';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity } from 'typeorm';

@Entity({
  database: databases.POLARIS_CP,
  schema: databases.POLARIS_CP,
})
export class Template extends BaseEntity {}
