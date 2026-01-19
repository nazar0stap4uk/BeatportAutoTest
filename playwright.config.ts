import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  retries: 0,
  use: {
	headless: false,
	baseURL: 'https://www.ukr.net/',
	viewport: { width: 1280, height: 720 },
	screenshot: 'only-on-failure',
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