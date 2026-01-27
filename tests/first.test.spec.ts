import { test, expect } from '@playwright/test';
import { testCredentials } from '../config/configtestdata';

test('should navigate to ukr.net', async ({ page }) => {
  await page.goto('https://www.ukr.net', { waitUntil: 'domcontentloaded', timeout: 60000 });

  const frame = page.frameLocator('iframe').first();
  
  await frame.locator('input[name="login"]').waitFor({ state: 'visible', timeout: 10000 });
  await frame.locator('input[name="password"]').waitFor({ state: 'visible', timeout: 10000 });

  await frame.locator('input[name="login"]').fill(testCredentials.login);
  await frame.locator('input[name="password"]').fill(testCredentials.password);

  await expect(frame.locator('input[name="login"]')).toHaveValue(testCredentials.login);
  await expect(frame.locator('input[name="password"]')).toHaveValue(testCredentials.password);
  
  console.log('Текст уведено в обидва поля');
});