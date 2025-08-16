/**
 * src\pages\components\Register\handlers\handler_api.ts
 */
import {HandlerApiProps} from "src/interfaces";

export async function handlerApiRegisterPOST(props: HandlerApiProps): Promise<{"data": string}> {
    try {
        const response = await fetch(props.api.url, {
            method: props.api.method,
            body: props.api.body,
        });
        if (response.ok) {
            try {
                const data = await response.json() as {data: string};
                return data;
            } catch (error) {
                console.error('Error parsing JSON:', error);
                return {"data": "Not OK"};
            }
            
        }
        return {"data": "handlerApiRegister: Error => Somothing what wrong!"};
    }catch (error: Error|unknown) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        };
        return {"data": "Not OK"};
    }
};
