import { expect, request } from '@playwright/test';


export async function getToken(user: string, password: string) {

    const apiContext = await request.newContext();
    const response = await apiContext.post('http://localhost:5162/sessions', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: JSON.stringify({
            emailAddress: user,
            password: password
        })
    });

    const responseBody = await response.json();
    const accessToken = responseBody.accessToken;
    return accessToken;
}