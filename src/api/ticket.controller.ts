import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { TicketsRepository } from 'src/data-access/tickets.repository';
import { TicketsService } from '../business-logic/tickets.service';
import { isTicketInputValObjOrThrow } from './ticket-input-validation.util';

@Controller()
export class TicketsController {
  constructor(
    private readonly ticketsRepository: TicketsRepository,
    private readonly ticketsService: TicketsService,
  ) {}

  @Post('ticket')
  async postTicket(@Res() res: Response, @Body() ticketInput: any) {
    // Validate input
    try {
      isTicketInputValObjOrThrow(ticketInput);
    } catch (err: any) {
      res.status(422).send({ error: err.message });
      return;
    }

    await this.ticketsService.processTicketCreation(ticketInput);

    res.status(201).send();
  }

  /**
   * This endpoint is for testing purposes only
   */
  @Get('tickets/:user_id')
  async getTicketsByUserId(
    @Res() res: Response,
    @Param('user_id') user_id: number,
  ) {
    const tickets = await this.ticketsRepository.getTicketsByUserId(user_id);
    res.status(200).send(tickets);
  }
}
