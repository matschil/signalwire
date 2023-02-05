import { Controller } from '@nestjs/common';
import { HttpRepository } from 'src/data-access/http.repository';
import { TicketsRepository } from '../data-access/tickets.repository';
import { TicketInput } from '../model/input/ticket-input';

@Controller()
export class TicketsService {
  constructor(
    private readonly ticketsRepository: TicketsRepository,
    private readonly httpRepository: HttpRepository
  ) {}
  
  async processTicketCreation(input: TicketInput){
    // Create ticket
    await this.ticketsRepository.createTicket(input);

    // Upsert tags 
    // TODO

    // Retrieve tag with highest count
    // TODO
    // send stats to external service
    const statsStub = {
      tag: 'tag',
      count: 1,
    }
    await this.httpRepository.postTagStats(statsStub);
  }
}
