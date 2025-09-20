/**
 * src\__tests__\testsOfHandlers\handlerApiValid.test.js
 */
const { handlerApiRegisterPOST } = require('../../pages/components/Register/handlers/handler_api');
const {APIPerson} = require("../../interfaces");
test('handlerApiRegisterPOST test validation the API haldler by POST method', async () => {
    const formData = new FormData();
    formData.append('username', `username_${Math.random()}`);
    formData.append('password', 'Eo121GOeWU6zaZgL');
    formData.append('email', 'mytest@test.com');
    const result = await handlerApiRegisterPOST({
        api: {
            url: `http://83.166.245.209:8000${APIPerson.API__POST_REGISTERATION.values}`,
            method: 'POST',
            body: formData,
        },
    });
    console.log(result);
    await Object.is(result, Promise.resolve({}));
    await expect(Object.values(result)[0]).toMatch('OK');
    await expect(Object.values(result)[0]).toBe('OK');
});
