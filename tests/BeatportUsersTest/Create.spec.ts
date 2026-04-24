import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { api } from 'config/api-endpoins';
import { query } from '../../config/db-config';

test('POST Create User', async ({ request }) => {

  var emailAddress: string;
  var password: string;
  var response: any;

  await test.step('User data generation', async () => {
    emailAddress = faker.internet.email();
    password = faker.internet.password();
    //console.log('Generated email:', emailAddress);
    //console.log('Generated password:', password);
  });

  await test.step('Send POST request to create user', async () => {
    response = await request.post(api.users.create, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        emailAddress: emailAddress,
        password: password
      })
    });
  });

  await test.step('Verify user creation', async () => {
    //Check status code
    expect(response.status()).toBe(201);
    //Check database user creation
    const emailQueryResult = await query(`SELECT "EmailAddress" FROM public."Users" WHERE "EmailAddress" = '${emailAddress}'`);
    // expect(emailQueryResult).toBeDefined();
    // expect(Array.isArray(emailQueryResult)).toBe(true);
    // expect(emailQueryResult.length).toBeGreaterThan(0);
    expect(emailQueryResult[0].EmailAddress).toBe(emailAddress);
    //console.log('User created successfully with email:', emailAddress);
    console.log('User created successfully');
  });
});