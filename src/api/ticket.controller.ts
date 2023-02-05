import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { TicketsService } from '../business-logic/tickets.service';
import { isTicketInputValObjOrThrow } from './ticket-input-validation.util';

@Controller('ticket')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get(':user_id')
  async getTicketsByUserId(
    @Res() res: Response,
    @Param('user_id') user_id: number,
  ) {
    return '';
  }

  @Post()
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
}
