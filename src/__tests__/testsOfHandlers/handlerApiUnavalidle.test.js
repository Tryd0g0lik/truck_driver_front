/**
 * src\__tests__\testsOfHandlers\handlerApiUnavalidle.test.js
 */
const { handlerApiRegisterPOST } = require("../../pages/components/Register/handlers/handler_api");


describe('Test the handler the POST API request and returning the not valid response', () =>{
    test.each([
        [`testUnavalible_${Math.random()}f`, 'Not OK'],
    ])('handlerApiRegisterPOST test unavalible', async (username, expected) => {

        const formData = new FormData();
        formData.append('username',username);
        formData.append('password', 'Eo121GOeWU6zaZgL');
        formData.append("email", "mytest@test.com");
        // Create user
        await handlerApiRegisterPOST({
                api: {
                    url: 'http://83.166.245.209:8000/api/auth/person/',
                    method: 'POST',
                    body: formData,
                }});
        // duplicate an username is error.
        const result = await handlerApiRegisterPOST({
                api: {
                    url: 'http://83.166.245.209:8000/api/auth/person/',
                    method: 'POST',
                    body: formData,
                }});
        await Object.is(result, {});
        // await expect(Object.values(result)[0]).toMatch('Not OK');
        await expect(Object.values(result)[0]).toEqual(expected);
    });
});
