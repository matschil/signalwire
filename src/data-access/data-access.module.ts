import { Module } from '@nestjs/common';
import { TicketsRepository } from './tickets.repository';
import { TagStatsRepository } from './tag-stats.repository';
import { HttpRepository } from './http.repository';

@Module({
  imports: [],
  providers: [TagStatsRepository, HttpRepository, TicketsRepository],
  exports: [TagStatsRepository, HttpRepository, TicketsRepository],
})
export class DataAccessModule {}
