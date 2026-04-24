import { test, expect } from '@playwright/test';
import { getToken } from '../../src/helper';
import { faker } from '@faker-js/faker';
import { api } from 'config/api-endpoins';
import { query } from '../../config/db-config';


test('Delete Current', async ({ request }) => {
    const emailAddress = faker.internet.email();
    const password = faker.internet.password();

    //console.log('Generated email:', emailAddress)
    //console.log('Generated password:', password);


    const usercreate = await request.post(api.users.create, {
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            emailAddress: emailAddress,
            password: password
        })
    });


    const accessToken = await getToken(emailAddress, password);


    expect(accessToken).toBeTruthy();
    //console.log('Access Token:', accessToken);


    const sessionDetails = await request.get(api.sessions.getDetails, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    expect(sessionDetails.status()).toBe(200);
    const detailsBody = await sessionDetails.json();
    //console.log('Session Details:', detailsBody);

    const getdetails = await request.get(api.users.getDetails, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    expect(getdetails.status()).toBe(200);
    const detailsBody2 = await getdetails.json();
    //console.log('User Details:', detailsBody2);

    // Test Delete User
    const deleteResponse = await request.delete(api.users.deleteCurrent, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
    });

    await test.step('Verify user deletion', async () => {
        //Check status code
        expect(deleteResponse.status()).toBe(204);
        //Check database to confirm user deletion
        const emailQueryResult = await query(`SELECT "EmailAddress" FROM public."Users" WHERE "EmailAddress" = '${emailAddress}'`);
        expect(emailQueryResult.length).toBe(0);
        console.log('User deleted successfully');
    });
});