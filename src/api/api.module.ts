import { Module } from '@nestjs/common';
import { BusinessLogicModule } from '../business-logic/business-logic.module';
import { TicketsController } from './tickets.controller';



@Module({
  imports: [BusinessLogicModule],  
  controllers: [TicketsController],
  providers: [],
})

export class ApiModule {}

