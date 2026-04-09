import { test, expect } from '@playwright/test';
import { getToken } from '../../src/helper';
import { faker } from '@faker-js/faker';
import { api } from 'config/api-endpoins';


test('Update Email Address', async ({ request }) => {

    const emailAddress = faker.internet.email();
    const password = faker.internet.password();
    const newEmailAddress = faker.internet.email();
    //console.log('Generated email:', emailAddress)
    //console.log('Generated password:', password);
    //console.log('Generated new email:', newEmailAddress);


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

    // Test Update Email Address
    const updateResponse = await request.put(api.users.updateEmailAddress, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            emailAddress: newEmailAddress
        })
    });

    expect(updateResponse.status()).toBe(204);
    //console.log('Generated email:', emailAddress)
    //console.log('Generated and updated email address:', newEmailAddress);
    console.log('Email address updated successfully');

});