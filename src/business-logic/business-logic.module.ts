import { Module } from '@nestjs/common';
import { DataAccessModule } from 'src/data-access/data-access.module';
import { TicketsService } from './tickets.service';

@Module({
  imports: [DataAccessModule],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class BusinessLogicModule {}
