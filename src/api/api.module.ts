import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';



@Module({
  imports: [],  
  controllers: [TicketsController],
  providers: [],
})

export class ApiModule {}

