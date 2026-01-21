import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 60000,  // 60 секунд для кожного тесту
  expect: {
    timeout: 10000,
  },
  use: {
    baseURL: 'https://www.ukr.net/',
    headless: false,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    navigationTimeout: 60000,
  },
  projects: [
	{
	  name: 'Desktop Chromium',
	  use: { browserName: 'chromium' },
	},
	//{
	//  name: 'Mobile Safari',
	//  use: { ...devices['iPhone 12'] },
	//},
  ],
});