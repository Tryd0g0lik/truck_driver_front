/**
 * src\pages\components\Register\handlers\handlerForm.ts
 */
import async_regex_validate_of_password from '../../../validators/validate_password';
import async_regex_validate_of_username from '../../../validators/validate_username';
import async_regex_validate_of_email from '../../../validators/validate_email';
import warnedMeaasege from '../../../../service/errorMessageForFields';


/**
 * This function:
 *  - check the data from the form fields;
 *  - check the data by validation;
 *  - send data to the API;
 * @param event - event from the form
 * @returns
 */
const handlerFormReger = async (event: React.MouseEvent): Promise<boolean | object> => {
    if (!(event.target as HTMLElement).tagName || (event.target as HTMLElement).tagName.toLowerCase() !== 'button') {
        return false;
    }
    event.preventDefault();
    let include = 0;


    /** 1. GET FIELDS FROM THE FORM */
    // const currentTarget = (event.target as HTMLElement).parentElement?.parentElement as HTMLElement;
    const currentTarget = (event.target as HTMLElement).closest('fieldset') as HTMLElement;
    const inputUserName = currentTarget.querySelector("input[placeholder='Имя пользователя']") as HTMLInputElement;
    const inputEmail = currentTarget.querySelector("input[type='email']") as HTMLInputElement;

    const inputPasswordArray = currentTarget.querySelectorAll("input[type='password']") ;
    if (inputPasswordArray.length < 2) {
        return false;
    }
    const selectHtml = currentTarget.querySelector('select.select-positions');
    /** Check - we have value/data in the attribute 'value' of filed 'input' or nnot. */
    let fields = [inputUserName, inputEmail,  ...inputPasswordArray, selectHtml].filter(Boolean);

    /** Simply? get the HTMLInputElement for type of checkbox  */
    const InputCheckbox = currentTarget.querySelector(".confirmation input[type='checkbox']");
    const htmlMinContainer = document.querySelector('.register_form') as HTMLElement;
    //
    /** 2. CHECKING - DATA FROM VALUES OF FIELD ('INPUT'). iT EQUAL FOR THE REGEX TEMPLETE OR NOT */
    const result = await Promise.allSettled([
        async_regex_validate_of_username((inputUserName as HTMLInputElement).value.trim()),
        async_regex_validate_of_email((inputEmail as HTMLInputElement).value.trim()),
        async_regex_validate_of_password((inputPasswordArray[0] as HTMLInputElement).value.trim()),
        async_regex_validate_of_password((inputPasswordArray[1] as HTMLInputElement).value.trim()),
        (inputPasswordArray[0] as HTMLInputElement).value.trim() === (inputPasswordArray[1] as HTMLInputElement).value.trim()
        ? true
        : false,
        (InputCheckbox as HTMLInputElement) && (InputCheckbox as HTMLInputElement).checked
        ? true
        : false

    ]);

    /** Check the data/ If we will find any error, we will be publication massage of warn and stoped the prosses */
    if (result[0].status == 'fulfilled' && !result[0].value) {
        /** Check the username */
        const htmlContainer = (inputUserName as HTMLInputElement).parentElement as HTMLElement;
        include = 1;
        await warnedMeaasege({ htmlContainer, include });
        return false;
    } else if (result[1].status == 'fulfilled' && !result[1].value) {
        /** Check the email */
        const htmlContainer = (inputEmail as HTMLInputElement).parentElement as HTMLElement;
        include = 1;
        await warnedMeaasege({ htmlContainer, include });
        return false;
    } else if (
        ((result[2].status == 'fulfilled' && !result[2].value) ||
                (result[3].status == 'fulfilled' && !result[3].value)) ||
        (result[2].status == 'fulfilled' && !result[2].value)
    ) {
        /** Check the password and duplicate of password */
        htmlMinContainer.style.position = 'relative';
        include = 1;
        const message = 'Одно из полей с паролем не верное или  пароли не совпадают';
        const top = true;
        await warnedMeaasege({ htmlContainer: htmlMinContainer, message, top, include });
        return false;
    } else if (result[5].status == 'fulfilled' && !result[5].value) {
        htmlMinContainer.style.position = 'relative';
        const top = true;
        const message = 'Подтвердите согласие на обработку персональных данных';
        include = 1;
        await warnedMeaasege({ htmlContainer: htmlMinContainer, message, top, include });
        return false;
    }
    /** If we will not find any error, we will be return data from the form fields  */
    const response = {
        username: (inputUserName as HTMLInputElement).value.trim(),
        email: (inputEmail as HTMLInputElement).value.trim(),
        password: (inputPasswordArray[0] as HTMLInputElement).value.trim(),
        category: (selectHtml as HTMLSelectElement).value.trim(),
    };

    return response;
};
export default handlerFormReger;
