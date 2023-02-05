import { Controller } from '@nestjs/common';
import { Connection } from 'typeorm';
import * as supertest from 'supertest';
import { TagStatValObj } from 'src/model/value-object/tag-stats.valobj';

@Controller()
export class HttpRepository {
  readonly request: supertest.SuperTest<supertest.Test>;
  constructor() {
    this.request = supertest('');    
  }

  postTagStats(payload: TagStatValObj){
    const recipientUrl = "https://webhook.site/9ed8db77-0008-49fc-b32c-d6fd85fc3a8f"
    return this.request.post(recipientUrl).send(payload);
  }
}
