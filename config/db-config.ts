import { Client } from 'pg';

const dbConfig = {
  user: '',
  host: 'localhost',
  database: 'beatport2rss',
  password: '',
  port: 5432,
};

export async function query(sql: string, params?: any[]) {
  const client = new Client(dbConfig);
  await client.connect();
  try {
    const res = await client.query(sql, params);
    return res.rows;
  } finally {
    await client.end();
  }
}