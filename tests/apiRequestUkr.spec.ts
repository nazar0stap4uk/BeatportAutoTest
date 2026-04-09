import { test, expect } from '@playwright/test';

test('GET todo', async ({ request }) => {
const response = await request.get('https://www.ukr.net/');

  expect(response.status()).toBe(200);

  console.log('GET request to https://www.ukr.net/ was successful with status 200');
  console.log('status code:', response.status());
});