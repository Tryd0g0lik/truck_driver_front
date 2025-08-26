/**
 * src\pages\components\Register\handlers\handlerForm.ts
 */
import async_regex_validate_of_password from "src/pages/validators/validate_password";
import async_regex_validate_of_username from "src/pages/validators/validate_username";
import async_regex_validate_of_email from "src/pages/validators/validate_email";
import warnedMeaasege from "src/service/errorMessageForFields";

/**
 * This function:
 *  - check the data from the form fields;
 *  - check the data by validation;
 *  - send data to the API;
 * @param event - event from the form
 * @returns 
 */
const handlerFormReger = async (event: React.MouseEvent): Promise<boolean|object> => {
    if (!(
        (event.target as HTMLElement).tagName.toLowerCase() === "button")
    ){
        return false;
    }
    event.preventDefault();
    let include = 0;
    
    /** 1. GET FIELDS FROM THE FORM */
    const currentTarget = (event.target as HTMLElement).parentElement?.parentElement as HTMLElement;
    const inputUserName = currentTarget.querySelector("input[placeholder='Имя пользователя']");
    const inputEmail = currentTarget.querySelector("input[type='email']") || "";
    
    const inputPasswordDuplicateArr = currentTarget.querySelectorAll("input[type='password']");
    const inputPassword = inputPasswordDuplicateArr[0] as HTMLInputElement;                               
    const inputPasswordDuplicate = inputPasswordDuplicateArr[1] as HTMLInputElement || ""; 
    const selectHtml =  currentTarget.querySelector("select.select-positions") || "";
    /** Check - we have value/data in the attribute 'value' of filed 'input' or nnot. */
    const fields = window.location.pathname.startsWith("/register/")? [inputUserName, inputEmail,
        inputPassword, inputPasswordDuplicate] : [inputUserName, inputPassword];
    const fieldsFilterArr = fields.filter((item) => (item as HTMLInputElement).value.length == 0);
    if (fieldsFilterArr.length > 0){
        /** WARNED MESSAGE WILL BE PUBLICATION */
        const labelNode = (fieldsFilterArr[0] as HTMLElement).parentElement;
        const htmlContainer=(labelNode as HTMLElement);
        include = 1;
        await warnedMeaasege({htmlContainer, include});
        return false;
    }
    /** Simply? get the HTMLInputElement for type of checkbox  */
    const InputCheckbox = currentTarget.querySelector(".confirmation input[type='checkbox']");
    const htmlMinContainer = document.querySelector(".register_form") as HTMLElement;
    // 
    /** 2. CHECKING - DATA FROM VALUES OF FIELD ('INPUT'). iT EQUAL FOR THE REGEX TEMPLETE OR NOT */
    const result = await Promise.allSettled([
            async_regex_validate_of_username((inputUserName as HTMLInputElement).value),
            fields.length > 2 ? async_regex_validate_of_email((inputEmail as HTMLInputElement).value) : null,
            async_regex_validate_of_password((inputPassword as HTMLInputElement).value),
            fields.length > 2 ? async_regex_validate_of_password((inputPasswordDuplicate as HTMLInputElement).value) : null,
            fields.length > 2 ? (async () => ((inputPassword as HTMLInputElement).value === (inputPasswordDuplicate as HTMLInputElement).value) ? true : false)(): null,
            fields.length > 2 ? (async () => (InputCheckbox as HTMLInputElement) && (InputCheckbox as HTMLInputElement).checked ? true : false)(): null
        ]);
    
    /** Check the data/ If we will find any error, we will be publication massage of warn and stoped the prosses */
    
    if (result[0].status == "fulfilled" && !result[0].value){
        /** Check the username */
        const htmlContainer = (inputUserName as HTMLInputElement).parentElement as HTMLElement; 
        include = 1;
        await warnedMeaasege({htmlContainer, include});
        return false;
    } else if (fields.length > 2  && result[1].status == "fulfilled" && !result[1].value) {
        /** Check the email */
        const htmlContainer = (inputEmail as HTMLInputElement).parentElement as HTMLElement;
        include = 1;
        await warnedMeaasege({htmlContainer, include});
        return false;
    } else if ((fields.length > 2  && (result[2].status == "fulfilled" && !result[2].value ||
        fields.length > 2 && result[3].status == "fulfilled" && !result[3].value
    ) ) || (
        fields.length == 2 && result[2].status == "fulfilled" && !result[2].value
    )) {
        /** Check the password and duplicate of password */
        htmlMinContainer.style.position = "relative";
        include = 1;
        const message = "Одно из полей с паролем не верное или  пароли не совпадают";
        const top = true;
        await warnedMeaasege({htmlContainer:htmlMinContainer, message, top, include});
        return false;
    }  else if (fields.length > 2 && result[5].status == "fulfilled" && !result[5].value) {
        htmlMinContainer.style.position = "relative";
        const top = true;
        const message = "Подтвердите согласие на обработку персональных данных";
        include = 1;
        await warnedMeaasege({htmlContainer:htmlMinContainer, message, top, include});
        return false;
        
    }
        /** If we will not find any error, we will be return data from the form fields  */
    const response = {
        "username": (inputUserName as HTMLInputElement).value,
        "email": fields.length > 2 ? (inputEmail as HTMLInputElement).value : "",
        "password": (inputPassword as HTMLInputElement).value,
        "category": fields.length > 2 ? (selectHtml as HTMLSelectElement).value : "",
    };
    
    return response;
    
};
export default handlerFormReger;
