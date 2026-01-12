import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './src/tests',
  retries: 2,
  use: {
	headless: true,
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