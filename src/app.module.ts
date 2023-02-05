import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BaseEntity } from './model/entity/base.entity';

const PG_CONFIG: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [BaseEntity],
  schema: 'public',
  synchronize: true,
  dropSchema: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(PG_CONFIG)],  
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

