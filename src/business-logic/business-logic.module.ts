import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';



@Module({
  imports: [],  
  providers: [TicketsService],
})

export class BusinessLogicModule {}

