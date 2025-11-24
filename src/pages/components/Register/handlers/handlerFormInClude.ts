/**
 * src\pages\components\Register\handlers\handlerFormInClude.ts
 */
import async_regex_validate_of_password from '../../../validators/validate_password';
import async_regex_validate_of_username from '../../../validators/validate_username';
import warnedMeaasege from '../../../../service/errorMessageForFields';
/**
 * This function:
 *  - check the data from the form fields;
 *  - check the data by validation;
 *  - send data to the API;
 * @param event - event from the form
 * @returns
 */
const handlerFormInclude = async (event: React.MouseEvent): Promise<boolean | object> => {
    if (!(event.target as HTMLElement).tagName || (event.target as HTMLElement).tagName.toLowerCase() !== 'button') {
        return false;
    }
    event.preventDefault();
    let include = 0;


    /** 1. GET FIELDS FROM THE FORM */
    // const currentTarget = (event.target as HTMLElement).parentElement?.parentElement as HTMLElement;
    const currentTarget = (event.target as HTMLElement).closest('fieldset') as HTMLElement;
    const inputUserName = currentTarget.querySelector("input[placeholder='Имя пользователя']") as HTMLInputElement;
    const inputPasswordArray = currentTarget.querySelectorAll("input[type='password']") ;
    if (inputPasswordArray.length === 2) return false;

    const inputPassword = inputPasswordArray[0] as HTMLInputElement;
    const selectHtml = currentTarget.querySelector('select.select-positions') || '';

    /** Simply? get the HTMLInputElement for type of checkbox  */
    const htmlMinContainer = document.querySelector('.register_form') as HTMLElement;
    let fields = [inputUserName, ...inputPasswordArray].filter(Boolean);


    //
    /** 2. CHECKING - DATA FROM VALUES OF FIELD ('INPUT'). iT EQUAL FOR THE REGEX TEMPLETE OR NOT */
    const result = await Promise.allSettled([
        async_regex_validate_of_username((inputUserName as HTMLInputElement).value.trim()),
        async_regex_validate_of_password((inputPassword as HTMLInputElement).value.trim()),
    ]);

    /** Check the data/ If we will find any error, we will be publication massage of warn and stoped the prosses */
    if (result[0].status == 'fulfilled' && !result[0].value) {
        /** Check the username */
        const htmlContainer = (inputUserName as HTMLInputElement).parentElement as HTMLElement;
        include = 1;
        await warnedMeaasege({ htmlContainer, include });
        return false;
    } else if (result[1].status == 'fulfilled' && !result[1].value) {
        htmlMinContainer.style.position = 'relative';
        const top = true;
        const message = 'Проверьте пароль';
        include = 1;
        await warnedMeaasege({ htmlContainer: htmlMinContainer, message, top, include });
        return false;
    }
    /** If we will not find any error, we will be return data from the form fields  */
    const response = {
        username: (inputUserName as HTMLInputElement).value.trim(),
        password: (inputPassword as HTMLInputElement).value.trim(),
        category: fields.length > 2 ? (selectHtml as HTMLSelectElement).value.trim() : '',
    };

    return response;
};
export default handlerFormInclude;
