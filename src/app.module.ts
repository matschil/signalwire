import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TicketEntity } from './model/entity/ticket.entity';
import { ApiModule } from './api/api.module';
import { TagsEntity } from './model/entity/tag.entity';

const PG_CONFIG: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [TicketEntity, TagsEntity],
  schema: 'public',
  synchronize: true,
  dropSchema: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(PG_CONFIG), ApiModule],  
  providers: [AppService],
})

export class AppModule {}

