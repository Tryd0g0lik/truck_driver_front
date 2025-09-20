/**
 * src\__tests__\testsOfHandlers\handlerApiValid.test.js
 */
const { handlerApiRegisterPOST } = require('../../pages/components/Register/handlers/handler_api');

test('handlerApiRegisterPOST test valid', async () => {
    const formData = new FormData();
    formData.append('username', `username_${Math.random()}`);
    formData.append('password', 'Eo121GOeWU6zaZgL');
    formData.append('email', 'mytest@test.com');
    const result = await handlerApiRegisterPOST({
        api: {
            url: 'http://83.166.245.209:8000/api/auth/person/',
            method: 'POST',
            body: formData,
        },
    });
    console.log(result);
    await Object.is(result, Promise.resolve({}));
    await expect(Object.values(result)[0]).toMatch('OK');
    await expect(Object.values(result)[0]).toBe('OK');
});
