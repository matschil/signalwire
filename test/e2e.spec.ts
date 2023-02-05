import { Test, TestingModule } from '@nestjs/testing';
import * as supertest from 'supertest';

describe('POST /tickets', () => {
  const request = supertest('');

  const serverBaseUrl = 'http://localhost:3000';
  const ticketRoute = '/ticket';
  
  
  it('[Input Validation] should return response code 422 for invalid inputs', async () => {
    const invalidInputs = [
      // id is not a number
       {
        user_id: '1234',
        title: 'My title',
        tags: ['tag1', 'tag2'],
      }, 
      // title is not a string
       {
        user_id: '1234',
        title: 1234,
        tags: ['tag1', 'tag2'],
      },
      
      // user_id is null
       {
        user_id: null,
        title: 1234,
        tags: ['tag1', 'tag2'],
      },  
      
      // user_id is undefined
      {
        user_id: undefined,
        title: 1234,
        tags: ['tag1', 'tag2'],
      },
      
      // title is null
      {
        user_id: 1234,
        title: null,
        tags: ['tag1', 'tag2'],
      },
      
      // title is undefined
      
      {
        user_id: 1234,
        title: undefined,
        tags: ['tag1', 'tag2'],
      },
      
      // title is empty string
      {
        user_id: 1234,
        title: '',
        tags: ['tag1', 'tag2'],
      },
      
      // tags is not an array
      {
        user_id: 1234,
        title: 'My title',
        tags: 'tag1',
      },
      // tags contains more than 4 elements
      {
        user_id: 1234,
        title: 'My title',
        tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
      }, 
    ];

    for (const invalidInput of invalidInputs) {
      const res = await request.post(`${serverBaseUrl}${ticketRoute}`).send(invalidInput);
      
      if(res.status !== 422){
        fail(
          `Expected response code 422 for invalid input: ${JSON.stringify(invalidInput)} but got ${res.status}`
        )
      }
    }
  });

  it('[Input Validation] should return response code 200 for valid inputs', async () => {
    const invalidInputs = [
      {
        user_id: 1234,
        title: 'My title',
        tags: ['tag1', 'tag2'],
      },
      {
        user_id: 1234,
        title: 'My title',
        tags: []
      },
      {
        user_id: 1234,
        title: 'My title',
      },
      {
        user_id: 1234,
        title: 'My title',
        tags: ['tag1', 'tag2', 'tag3', 'tag4'],
      },
    ];

    for (const invalidInput of invalidInputs) {
      const res = await request.post(`${serverBaseUrl}${ticketRoute}`).send(invalidInput);
      expect(res.status).toBe(422);
    }
  });
});
