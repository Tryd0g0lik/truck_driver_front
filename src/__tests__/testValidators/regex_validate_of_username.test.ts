import usernameValidator from '../../pages/validators/validate_username';

describe('Test for validators of form fields VAlid', () => {
    const validUsername = ['john_doe', 'user123', 'User_Name', 'afr', 'username123'];
    const invalidUsernames = [
        '',
        '   ',
        'test-user',
        '123',
        'a',
        'user@name',
        'user#test',
        '123user',
        'very_long_username_exceeding_maximum_length_maximum_length',
        'user name',
        '.username',
    ];
    test.each(validUsername)('Test for the valid username: %s', async (username: string) => {
        const result = await usernameValidator(username);
        console.log(result);
        expect(result).toBe(true);
    });
    test.each(invalidUsernames)('Test for the invalid username: %s', async (username: string) => {
        const result = await usernameValidator(username);
        console.log(result);
        expect(result).toBe(false);
    });
});
