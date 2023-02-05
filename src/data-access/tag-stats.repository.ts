import { Controller } from '@nestjs/common';
import { TagStatEntity } from '../model/entity/tag-stat.entity';
import { Connection } from 'typeorm';
import { TagStatValObj } from 'src/model/value-object/tag-stats.valobj';

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
      .onConflict(
        `("tag") DO UPDATE SET "count" = "tag_stat_entity"."count" + 1`,
      )
      .execute();
  }

  async getTagWithHighestCount(): Promise<TagStatValObj | undefined> {
    const tagStat: { tag: string; count: number } | undefined =
      await this.connection
        .createQueryBuilder()
        .select('*')
        .from(TagStatEntity, '')
        .orderBy('count', 'DESC')
        .take(1)
        .getRawOne();

    return tagStat;
  }
}
