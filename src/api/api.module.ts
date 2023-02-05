import { Module } from '@nestjs/common';
import { DataAccessModule } from 'src/data-access/data-access.module';
import { BusinessLogicModule } from '../business-logic/business-logic.module';
import { TicketsController } from './ticket.controller';

@Module({
  imports: [BusinessLogicModule, DataAccessModule],
  controllers: [TicketsController],
  providers: [],
})
export class ApiModule {}
