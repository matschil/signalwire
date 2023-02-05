import { Controller } from '@nestjs/common';
import { TagEntity } from '../model/entity/tag.entity';
import { Connection } from 'typeorm';

@Controller()
export class TagsRepository {
  constructor(private readonly connection: Connection) {}

  async upsertTagCounts(tags: string[]) {
    const formattedTags = tags.map((tag) => tag.toLowerCase());

    // increase count of each tag by 1 or create new tag with count 1
    await this.connection
      .createQueryBuilder()
      .insert()
      .into(TagEntity)
      .values(formattedTags.map((tag) => ({ tag, count: 1 })))
      .onConflict(`("tag") DO UPDATE SET "count" = "count" + 1`)
      .execute();
  }

  async getTagWithHighestCount(): Promise<TagEntity | undefined> {
    return this.connection
      .createQueryBuilder()
      .select('*')
      .from(TagEntity, 'tag')
      .orderBy('tag.count', 'DESC')
      .limit(1)
      .getOne();
  }
}
