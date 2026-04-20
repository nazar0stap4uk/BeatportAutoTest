
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5162';

export async function getToken(emailAddress: string, password: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      emailAddress,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error(`Login failed with status ${response.status}`);
  }

  const data = await response.json() as any;
  return data.accessToken || data.token;
}

