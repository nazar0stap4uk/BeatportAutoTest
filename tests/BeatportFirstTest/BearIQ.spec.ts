import { test, expect } from '@playwright/test';

test('Login to Bear IQ with Auth0', async ({ page }) => {
  console.log('Starting Bear IQ login test...');

  // Generate unique screenshot names with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const platformScreenshotPath = `beariq-platform-${timestamp}.png`;

  // Navigate to Bear IQ
  await page.goto('https://dev.beariq.com/', { waitUntil: 'load' });
  console.log('Navigated to:', page.url());

  // Wait for login form to be visible
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  // Fill email using label
  await page.getByLabel('Email Address').fill('captain.america@marvel.com');
  console.log('Email entered');

  // Fill password using label
  await page.getByLabel('Password').fill('3zZS[sU;C#P+m4=1');
  console.log('Password entered');

  // Click login button
  await page.getByRole('button', { name: 'Log in', exact: true }).click();
  console.log('Clicked login');

  // Wait for Auth0 callback to complete
  await page.waitForURL(/auth\/login\?code=/, { timeout: 60000 });
  console.log('Auth0 callback received');

  // Wait for dashboard page to be fully loaded after callback processing
  await page.waitForLoadState('networkidle', { timeout: 60000 });
  await page.waitForTimeout(3000);
  console.log('Dashboard loaded, redirected to:', page.url());

  // Navigate to Platforms page
  await page.goto('https://dev.beariq.com/platforms', { waitUntil: 'networkidle' });
  console.log('Navigated to Platforms page');

  // Wait for Platforms page to fully load
  await page.waitForLoadState('networkidle');
  console.log('Platforms page loaded');

  // Wait for content to render
  await page.waitForTimeout(2000);

  // Verify we're on the Platforms page
  const platformUrl = page.url();
  console.log('Current URL:', platformUrl);
  expect(platformUrl).toContain('platforms');

  // Take screenshot of fully loaded Platforms page
  await page.screenshot({ path: platformScreenshotPath });
  console.log(`✓ Platforms screenshot saved: ${platformScreenshotPath}`);

  console.log('✓ Test completed successfully!');
});

// test('Login', async ({ request }) => {
//   const response = await request.post('https://dev.beariq.com/', {
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     data: JSON.stringify({
//       emailAddress: 'John.Doe3433й4@exampeer.com',
//       password: '1234567qwerty'
//     })
//   });

//   expect(response.status()).toBe(201);

//   //console.log('POST request to http://localhost:5162/scalar/#tag/users/POST/users was successful with status 201');
//   console.log('status code:', response.status());
// });


// спробувати await page.waitForLoadState('networkidle');  Не використовувати networkidle  
// aitForLoadState має бути чистий дефолтний