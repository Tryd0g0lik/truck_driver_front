/**
 * src\pages\components\Register\handlers\handlerMain.ts
 */
import handlerFormReger from "./handlerForm";
import { handlerApiRegisterPOST } from "./handler_api";
import { BasisData,  HandlerApiProps } from "@interfeces";
import {APIPerson, APP_URL} from "src/interfaces";
import warnedMeaasege from "src/service/errorMessageForFields";
import { ActiveUser } from "@interfeces";

// TASK 1/3. Record the access-tokens of user in cookies
const task_by_record_token_to_cookies = (responseApi:  ActiveUser) => {new Promise((resolve) => {
        const dataArr = responseApi["data"][0];
        
        (Object.values(dataArr)).forEach((view) => {
            const kArr = Object.keys(view);
            const vArr = Object.values(view);
            if ((kArr as Array<string>).includes("last_login")){
                const time = Object.values((dataArr as unknown as ActiveUser["data"][0])["refresh"])[1];
                document.cookie = `person=${JSON.stringify(view)}; path=/; max-age=${time}`;
            }
            else{
                document.cookie = `${kArr[0]}=${vArr[0]}; path=/; httpOnly; max-age=${vArr[1]}`;
            };            
            resolve(true);
        
        });
    });
};

// TASK 2/3. CLeaning input fields
const task_by_cleaning_inpyts = new Promise((resolve) => {
    const result_of_inputAll = document.querySelectorAll(".register_form input");
    (result_of_inputAll.length > 0) ? 
    (result_of_inputAll).forEach(item => ((item as HTMLInputElement).value as string) = "") 
    : null;
    resolve(true);
});
        
/**
 * @param event MouseEvent is mousdown event.
 * @returns Promise<boolean>
 */
export const mainHandler = async (event: React.MouseEvent): Promise<boolean> => {
    /** WARNING MESSAGE CHECK & REMOVE */
    await warnedMeaasege({include: 0});
    /** NUMBER 1 & 2 - in  the 'handlerFormReger' - CHECKER & VALIDATER */
    const response = await handlerFormReger(event);
    if (!response){
        return false;
    }
    /** 3. IF WE GET DATA FROM THE FORM FILEDS WE WILL BE SEND IT TO THE API */
    const dotaForm = new FormData();
    for (const [k, v] of Object.entries(response as BasisData) ){
        dotaForm.append(k, v as string);
    }
    const pathname = window.location.pathname.startsWith("/register/")? `${APIPerson.API__POST_REGISTERATION}` : `${APIPerson.API__POST_LOGIN}`;
    const dataForAPI:HandlerApiProps = {
        "api": {
            "url": APP_URL + pathname,
            "method": "POST",
            "body": dotaForm,
        }
    };
    
    try {
        const responseApi = await handlerApiRegisterPOST(dataForAPI);
        if (!(typeof responseApi["data"]).toLowerCase().includes("object") || (
            (typeof responseApi["data"]).toLowerCase().includes("object") && Object.keys(((responseApi as unknown as ActiveUser)["data"])[0]).length < 2)
        ){
            return false;
        }
        // TASK 3/3. Relocate to the main page.
        const task_by_relocation = new Promise((resolve) => {
            window.location.pathname.startsWith("/register/") ? window.location.pathname =  "/login/" : window.location.pathname =  "/";
            resolve(true);
        });
        Promise.all([
            task_by_record_token_to_cookies(responseApi as unknown as  ActiveUser),
            task_by_cleaning_inpyts,  task_by_relocation 
        ]);
        return true;
    } catch (error) {
        console.log("Error => ", error);   
        return false;
    };
};
