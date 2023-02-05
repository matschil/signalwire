import { Module } from '@nestjs/common';
import { BusinessLogicModule } from '../business-logic/business-logic.module';
import { TicketsController } from './ticket.controller';



@Module({
  imports: [BusinessLogicModule],  
  controllers: [TicketsController],
  providers: [],
})

export class ApiModule {}

