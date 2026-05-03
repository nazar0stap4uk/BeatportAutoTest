import { test, expect } from '@playwright/test';
import { getToken } from '../../src/helper';
import { faker } from '@faker-js/faker';
import { api } from 'config/api-endpoins';
import { query } from 'config/db-config';


test('Update', async ({ request }) => {

    const emailAddress = faker.internet.email();
    const password = faker.internet.password();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
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

    // Test Update User with generated firstName and lastName
    const updateResponse = await request.put(api.users.update, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            firstName: firstName,
            lastName: lastName
        })
    });

    await test.step('Verify user update', async () => {
        //Check status code
        expect(updateResponse.status()).toBe(204);
        //Check database user update
        const emailQueryResult = await query(`SELECT "FirstName", "LastName" FROM public."Users" WHERE "EmailAddress" = '${emailAddress}'`);
        expect(emailQueryResult[0].FirstName).toBe(firstName);
        expect(emailQueryResult[0].LastName).toBe(lastName);

        console.log('User updated successfully');
        //console.log('Generated and updated firstName:', firstName);
        //console.log('Generated and updated lastName:', lastName);
    });
});