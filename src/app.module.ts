import { INestApplication, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig, { databases } from './common/config/database.config';
import { TemplatesModule } from './templates/templates.module';
import { GithubActionsModule } from './github-actions/github-actions.module';
import { ProductsModule } from './products/products.module';

export const appModuleDocumentation = (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('Polaris Control Plane')
    .setDescription('API for access to the Polaris Control Plane Application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
};

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig.polarisCp],
    }),
    TypeOrmModule.forRootAsync({
      name: databases.POLARIS_CP,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get(databases.POLARIS_CP),
    }),
    TemplatesModule,
    GithubActionsModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
