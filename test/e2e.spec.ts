import { Test, TestingModule } from '@nestjs/testing';
import * as supertest from "supertest"

describe('AppController', () => {

  const request = supertest("")

  beforeEach(async () => {
  });

  describe('root', () => {
    it("Gan GET stub data", async () => {
      const res =  await request.get("http://localhost:3000")
      expect(res.status).toBe(200)
    })
  });
});
