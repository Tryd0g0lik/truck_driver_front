/**
 * src\__tests__\testValidators\regexVaidateOfPassword.test.ts
 */
import usernameValidator from '../../pages/validators/validate_password';

describe('regex_validate_of_password', () => {
    const invalidStrings = [
        // Слишком короткие (меньше 9 символов)
        '', // пустая строка
        'a', // 1 символ
        'ab', // 2 символа
        'abc', // 3 символа
        'abcd', // 4 символа
        'abcde', // 5 символов
        'abcdef', // 6 символов
        'abcdefg', // 7 символов
        'abcdefgh', // 8 символов - почти достаточно!

        // Слишком длинные (больше 255 символов)
        'a'.repeat(254), // 256 символов
        '1'.repeat(254), // 300 цифр
        '_'.repeat(254), // 1000 подчеркиваний
        '%'.repeat(254), // 256 процентов
        'a1%'.repeat(86), // 258 символов (86*3=258)

        // Запрещенные символы
        'abc defgh', // пробел
        'test@mail', // @ символ
        'hello-world', // дефис (не путать с подчеркиванием)
        'user.name', // точка
        'price$100', // доллар
        'test#tag', // решетка
        'path/to/file', // слэш
        'name+surname', // плюс
        'value=123', // равно
        'tab character', // табуляция
        "quote'string", // одинарная кавычка
        'quote"string', // двойная кавычка
        'unicodeñáé', // unicode символы
        'emoji😊test', // эмодзи
        // Смешанные невалидные случаи
        'short', // короткий + без запрещенных символов
        'a'.repeat(254), // длинный + без запрещенных символов
        'abc@def', // правильная длина + запрещенный символ
        'приветмир', // кириллица
        '中文测试', // китайские иероглифы
        'العربية', // арабские символы
        'café_au_lait', // символ с диакритикой
        'password%secure', // обычное использование
        'percent%percent%but_too_short', // содержит % но слишком короткий
        '   spaces   ', // пробелы
        'test\\backslash', // обратный слэш
        '',
        '_________',
        'hello_world%test', // обычная строка
        'a'.repeat(253), // 255 букв 'a'
        '1'.repeat(253), // 255 цифр
        '%'.repeat(253), // 255 процентов
        'a'.repeat(254), // ровно 255 символов
        'abc%def%', // с процентами
    ];
    const validStrings = [
        // Минимальная длина (9 символов)
        'abcdefghi', // 9 букв
        '123456789', // 9 цифр
        'abc123def', // буквы и цифры
        'A%B%C%D%E', // заглавные буквы + %
        '123%456%7', // 9 подчеркиваний
        'a%a%a%a%a', // чередование букв и %
        'valid_string_123%', // смешанные символы
        'user%name%123', // с процентами
        'a1%b2%c3%d4%e5', // паттерн
        'a_b_c_d_e', // с подчеркиваниями
        'a1%'.repeat(85), // паттерн из 3 символов (85*3=255)
        '123456789', // ровно 9 символов
        'TEST_STRING_456%', // заглавные буквы
        'w%w%w%w%w%w%w%w%w', // 9 символов с %
        'valid%test%string%example%123', // реалистичный пример
        'A_b%1'.repeat(51), // паттерн из 5 символов (51*5=255)
    ];

    test.each(invalidStrings)("should invalidate '%s'", async (input) => {
        const result = await usernameValidator(input);
        expect(result).toBe(false);
    });

    test.each(validStrings)("should validate '%s'", async (input) => {
        const result = await usernameValidator(input);
        expect(result).toBe(true);
    });
});
