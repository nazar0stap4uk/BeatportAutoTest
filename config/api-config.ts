// src/config/apiConfig.ts
export const apiConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
    // 'X-API-Version': 'value',
  } as const, // робить об'єкт readonly + краща типізація

  // можна додати інші налаштування
  baseURL: process.env.API_BASE_URL || 'https://api.example.com',
  timeout: 100000,
} satisfies {
  headers: Record<string, string>;
  baseURL: string;
  timeout: number;
};