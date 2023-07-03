import { databases } from 'src/common/config/database.config';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

export enum ProductRole {
  AUDIO = 'AUDIO',
  CONTROL_PANEL = 'CONTROL_PANEL',
  GRAPHICS = 'GRAPHICS',
  INTERCOM = 'INTERCOM',
  MONITORING = 'MONITORING',
  ROUTER = 'ROUTER',
  STREAMING = 'STREAMING',
  SWITCHER = 'SWITCHER',
}

@Entity({
  database: databases.POLARIS_CP,
  schema: databases.POLARIS_CP,
})
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column()
  label: string;

  @Column('enum', { enum: ProductRole, array: true, default: [] })
  roles: ProductRole[];
}
