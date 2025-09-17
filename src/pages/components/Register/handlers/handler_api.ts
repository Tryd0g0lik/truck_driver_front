/**
 * src\pages\components\Register\handlers\handler_api.ts
 */
import {ActiveUser, HandlerApiProps} from "src/interfaces";

export async function handlerApiRegisterPOST(props: HandlerApiProps): Promise<{"data": string | ActiveUser}> {
    try {
        const response = await fetch(props.api.url, {
            method: props.api.method,
            body: props.api.body,
        });
        if (response.ok) {        
            const data = await response.json() as {data: string};
            return data;
        }
        return {"data": "Not OK"};
    }catch (error: Error|unknown) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        };
        return {"data": "handlerApiRegister: Error => Somothing what wrong!"};
    }
};
