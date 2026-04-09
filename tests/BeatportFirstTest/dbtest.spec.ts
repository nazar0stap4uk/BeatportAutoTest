import { test, expect, request } from '@playwright/test';
import { query } from '../../config/db-config';


test('query all users from database', async () => {
    const results = await query('SELECT * FROM public."Users";');
    console.log('All users from database:', results);
    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
});