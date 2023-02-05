import { Body, Controller, Get, Post } from '@nestjs/common';
import { TicketInput } from '../model/input/ticket-input';
import { TicketsRepository } from '../data-access/tickets.repository';

@Controller()
export class TicketsService {
  constructor(
    private readonly ticketsRepository: TicketsRepository,
  ) {}
  
  async processTicketCreation(input: TicketInput){
    return this.ticketsRepository.createTicket(input);
  }
}
