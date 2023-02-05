import * as supertest from 'supertest';

describe('POST /tickets', () => {
  const request = supertest('');

  const serverBaseUrl = 'http://localhost:3000';

  it('SPEC-1 Should return response code 422 for invalid inputs', async () => {
    const ticketRoute = '/ticket';

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
      const res = await request
        .post(`${serverBaseUrl}${ticketRoute}`)
        .send(invalidInput);

      if (res.status !== 422) {
        fail(
          `Expected response code 422 for invalid input: ${JSON.stringify(
            invalidInput,
          )} but got ${res.status}`,
        );
      }

      // Expect that error message is returned
      expect(res.body?.error?.length).toBeGreaterThan(0);
    }
  });

  it('SPEC-2 Should return response code 200 for valid inputs', async () => {
    const ticketRoute = '/ticket';

    const validInputs = [
      {
        user_id: 1234,
        title: 'My title',
        tags: ['tag1', 'tag2'],
      },
      {
        user_id: 1234,
        title: 'My title',
        tags: [],
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

    for (const validInput of validInputs) {
      const res = await request
        .post(`${serverBaseUrl}${ticketRoute}`)
        .send(validInput);
      expect(res.status).toBe(201);
    }
  });

  it('SPEC-3 Should persist ticket', async () => {
    const ticketRoute = '/ticket';
    const ticketsRoute = '/tickets';

    const user_id = 4321;
    const title = 'My title';
    const tags = ['tag1', 'tag2'];

    // Post ticket
    const ticketInput = {
      user_id,
      title,
      tags,
    };

    await request.post(`${serverBaseUrl}${ticketRoute}`).send(ticketInput);

    // Get ticket
    const res = await request.get(
      `${serverBaseUrl}${ticketsRoute}/${ticketInput.user_id}`,
    );

    // Assert that ticket is persisted
    const tickets = res.body;
    const latestTicketOfUser = tickets[tickets.length - 1];

    expect(latestTicketOfUser.user_id).toBe(user_id);
    expect(latestTicketOfUser.title).toBe(title);
  });

  it('SPEC-4 Should send http request containing current tag with highest count to external service', async () => {
    const ticketRoute = '/ticket';

    const user_id = 4321;
    const title = 'My title';

    // Preparation: Retrieve latest tag that was sent to external service
    // https://docs.webhook.site/api/about.html#common-usages
    let res = await request.get(
      `https://webhook.site/token/9ed8db77-0008-49fc-b32c-d6fd85fc3a8f/requests?page=1&password=&query=&sorting=newest`,
    );
    const latestRequestBeforeTest = res.body.data[0];
    const latestTagStatBeforeTest = JSON.parse(latestRequestBeforeTest.content);

    const tag = latestTagStatBeforeTest.tag;

    // Post 10 tickets with tag
    for (let i = 0; i < 10; i++) {
      await request.post(`${serverBaseUrl}${ticketRoute}`).send({
        user_id,
        title,
        tags: [tag],
      });
    }

    // Retrieve latest tag that was sent to external service
    res = await request.get(
      `https://webhook.site/token/9ed8db77-0008-49fc-b32c-d6fd85fc3a8f/requests?page=1&password=&query=&sorting=newest`,
    );
    const latestRequest = res.body.data[0];
    const latestTagStat = JSON.parse(latestRequest.content);

    expect(latestTagStat.tag).toBe(tag);
    expect(latestTagStat.count).toBe(latestTagStatBeforeTest.count + 10);
  });

  it('SPEC-6 Should count tags with case insensitivity', async () => {
    const ticketRoute = '/ticket';

    const user_id = 4321;
    const title = 'My title';

    // Preparation: Retrieve latest tag that was sent to external service
    let res = await request.get(
      `https://webhook.site/token/9ed8db77-0008-49fc-b32c-d6fd85fc3a8f/requests?page=1&password=&query=&sorting=newest`,
    );
    const latestRequestBeforeTest = res.body.data[0];
    const latestTagStatBeforeTest = JSON.parse(latestRequestBeforeTest.content);

    const tag = latestTagStatBeforeTest.tag;
    const uppercaseTag = tag.toUpperCase();

    expect(tag).not.toEqual(uppercaseTag);

    // Post 5 tickets with lowercase tag
    for (let i = 0; i < 5; i++) {
      await request.post(`${serverBaseUrl}${ticketRoute}`).send({
        user_id,
        title,
        tags: [tag],
      });
    }

    // Post 5 tickets with uppercase tag
    for (let i = 0; i < 5; i++) {
      await request.post(`${serverBaseUrl}${ticketRoute}`).send({
        user_id,
        title,
        tags: [uppercaseTag],
      });
    }

    // Retrieve latest tag that was sent to external service
    res = await request.get(
      `https://webhook.site/token/9ed8db77-0008-49fc-b32c-d6fd85fc3a8f/requests?page=1&password=&query=&sorting=newest`,
    );
    const latestRequestAfterTest = res.body.data[0];
    const latestTagStatAfterTest = JSON.parse(latestRequestAfterTest.content);

    expect(latestTagStatAfterTest.tag).toBe(tag);
    expect(latestTagStatAfterTest.count).toBe(
      latestTagStatBeforeTest.count + 10,
    );
  });
});
