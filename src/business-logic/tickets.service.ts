import { Controller } from '@nestjs/common';
import { HttpRepository } from 'src/data-access/http.repository';
import { TagStatsRepository } from 'src/data-access/tag-stats.repository';
import { TicketsRepository } from '../data-access/tickets.repository';
import { TicketInput } from '../model/input/ticket-input';

@Controller()
export class TicketsService {
  constructor(
    private readonly ticketsRepository: TicketsRepository,
    private readonly tagsRepository: TagStatsRepository,
    private readonly httpRepository: HttpRepository,
  ) {}

  async processTicketCreation(input: TicketInput) {
    // Create ticket
    await this.ticketsRepository.createTicket(input);

    // Upsert tags
    await this.tagsRepository.upsertTagCounts(input.tags ?? []);

    // Retrieve tag with highest count
    const tagWithHighestCount =
      await this.tagsRepository.getTagWithHighestCount();

    if (!tagWithHighestCount) {
      return;
    }

    // send stats to external service
    await this.httpRepository.postTagStats(tagWithHighestCount);
  }
}
