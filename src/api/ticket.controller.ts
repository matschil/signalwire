import { Body, ConsoleLogger, Controller, Get, Post, Req, Res } from '@nestjs/common';
import Ajv from 'ajv';
import { Request, Response } from 'express';
import { JSONSchema6Definition } from 'json-schema';
import { TicketsService } from '../business-logic/tickets.service';
import { isTicketInputValObjOrThrow } from './ticket-input-validation.util';

@Controller('ticket')
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService,
  ) {}

  @Get()
  async getTicketsByUserId(): Promise<string> {
    return '';
  }

  @Post()
  async postHello(
    @Res() res: Response,
    @Body() ticketInput: any): Promise<string> {
    try {
      isTicketInputValObjOrThrow(ticketInput);
    } catch (err: any) {

      // Return 422 
      console.log(err.message)
      res.status(422).send(err.message); 
    }

    await this.ticketsService.processTicketCreation(
      ticketInput,
    )

    return '';
  }
}
