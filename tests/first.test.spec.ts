import { test, expect } from '@playwright/test';

test('should navigate to ukr.net', async ({ page }) => {
  await page.goto('https://www.ukr.net', { waitUntil: 'domcontentloaded', timeout: 60000 });

  const frame = page.frameLocator('iframe').first();
  
  await frame.locator('input[name="login"]').waitFor({ state: 'visible', timeout: 10000 });
  await frame.locator('input[name="password"]').waitFor({ state: 'visible', timeout: 10000 });
  
  await frame.locator('input[name="login"]').fill('NazarTest@gmail.com');
  await frame.locator('input[name="password"]').fill('123456qwerty');
  
  await expect(frame.locator('input[name="login"]')).toHaveValue('NazarTest@gmail.com');
  await expect(frame.locator('input[name="password"]')).toHaveValue('123456qwerty');
  
  console.log('Текст уведено в обидва поля');
});