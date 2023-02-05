import { Module } from '@nestjs/common';
import { TicketsRepository } from './tickets.repository';
import { TagsRepository } from './tags.repository';
import { HttpRepository } from './http.repository';

@Module({
  imports: [],
  providers: [TagsRepository, HttpRepository, TicketsRepository],
  exports: [TagsRepository, HttpRepository, TicketsRepository],
})
export class DataAccessModule {}
