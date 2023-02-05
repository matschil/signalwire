import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BaseEntity } from './model/entity/base.entity';
import { ApiModule } from './api/api.module';

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
  imports: [TypeOrmModule.forRoot(PG_CONFIG), ApiModule],  
  providers: [AppService],
})

export class AppModule {}

