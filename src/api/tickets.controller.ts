import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller()
export class TicketsController {
  constructor() {}

  @Get()
  async getTicketsByUserId(): Promise<string> {
    return '';
  }

  @Post()
  async postHello(@Body() ticketInput: any): Promise<string> {
    return '';
  }
}
