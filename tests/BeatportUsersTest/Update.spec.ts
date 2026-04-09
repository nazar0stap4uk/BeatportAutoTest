import { test, expect } from '@playwright/test';
import { getToken } from '../../src/helper';
import { faker } from '@faker-js/faker';
import { api } from 'config/api-endpoins';


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

    expect(updateResponse.status()).toBe(204);
    //console.log('Generated and updated firstName:', firstName);
    //console.log('Generated and updated lastName:', lastName);
    console.log(`User firstName and lastName updated successfully`);


    // //const updateBody = await updateResponse.json();
    // //console.log('Update Response:', updateBody);

    // // Verify update was successful
    // expect(updateBody).toBeTruthy();
    // expect(updateBody.message).toContain('update successfully');

    // // Get user details to verify updated firstName and lastName
    // const getDetailsAfterUpdate = await request.get(api.users.getDetails, {
    //     headers: {
    //         'Authorization': `Bearer ${accessToken}`
    //     }
    // });

    // expect(getDetailsAfterUpdate.status()).toBe(200);
    // const detailsAfterUpdate = await getDetailsAfterUpdate.json();
    // console.log('User Details After Update:', detailsAfterUpdate);

    // // Compare and verify firstName and lastName match
    // expect(detailsAfterUpdate.firstName).toBe(firstName);
    // expect(detailsAfterUpdate.lastName).toBe(lastName);
    // console.log(`✓ Update verified: firstName='${firstName}', lastName='${lastName}'`);

});