import { Controller } from '@nestjs/common';
import { TagStatEntity } from '../model/entity/tag-stat.entity';
import { Connection } from 'typeorm';

@Controller()
export class TagStatsRepository {
  constructor(private readonly connection: Connection) {}

  async upsertTagCounts(tags: string[]) {
    const formattedTags = tags.map((tag) => tag.toLowerCase());

    // increase count of each tag by 1 or create new tag with count 1
    await this.connection
      .createQueryBuilder()
      .insert()
      .into(TagStatEntity)
      .values(formattedTags.map((tag) => ({ tag, count: 1 })))
      .onConflict(`("tag") DO UPDATE SET "count" = "tag_stat_entity"."count" + 1`)
      .execute();
  }

  async getTagWithHighestCount(): Promise<TagStatEntity | undefined> {
    return this.connection
      .createQueryBuilder()
      .select('*')
      .from(TagStatEntity, 'tag')
      .orderBy('tag.count', 'DESC')
      .limit(1)
      .getOne();
  }
}
