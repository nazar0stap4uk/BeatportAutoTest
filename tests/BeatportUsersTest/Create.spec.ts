import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { api } from 'config/api-endpoins';
//import { create } from 'node:domain'; ????

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
    expect(response.status()).toBe(201);
    // DB query to verify user creation  added here needed
    //console.log('status code:', response.status());
    console.log('User created successfully');
  });

});