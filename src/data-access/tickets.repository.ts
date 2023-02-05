import { Controller } from '@nestjs/common';
import { TicketEntity } from 'src/model/entity/ticket.entity';
import { TicketInput } from 'src/model/input/ticket-input';
import { TicketValObj } from 'src/model/value-object/ticket.valobj';
import { Connection } from 'typeorm';

@Controller()
export class TicketsRepository {
  constructor(private readonly connection: Connection) {}

  async createTicket(input: TicketInput) {
    return this.connection
      .createQueryBuilder()
      .insert()
      .into(TicketEntity)
      .values([input])
      .execute();
  }

  async getTicketsByUserId(user_id: number): Promise<TicketValObj[]> {
    return this.connection
      .createQueryBuilder()
      .select('*')
      .from(TicketEntity, 'ticket')
      .where('ticket.user_id = :user_id', { user_id })
      .getRawMany();
  }
}
