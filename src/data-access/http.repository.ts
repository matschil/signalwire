import { Controller } from '@nestjs/common';
import { Connection } from 'typeorm';

@Controller()
export class HttpRepository {
  constructor(private readonly connection: Connection,) {}

  createTicket(){
    
  }
}
