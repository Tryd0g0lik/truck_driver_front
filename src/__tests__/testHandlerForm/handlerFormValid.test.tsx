import handlerFormReger from '../../pages/components/Register/handlers/handlerForm';
import React from 'react';
import '@testing-library/jest-dom';
import { JSDOM } from 'jsdom';
const username = 'username';
describe('Testing window.location.pathname', () => {
    let documents: Document;
    beforeEach(() => {
        const { document, window } = new JSDOM(
            `
            <!DOCTYPE html>
                <html lang="ru" data-ds-theme="dark-theme">

                <head>
                <meta charset="UTF-8">
                <meta name="mobile-web-app-capable" content="yes">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta content='yes' name='apple-mobile-web-app-capable' />
                <title>Truck Driver</title>
                </head>
                <div id="body">
                    <div id="root" class="form-container">
                        <fieldset  class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                                <label class="label"><span>Имя пользователя</span>
                                    <input type="text" class="input" value="${username}" placeholder="Имя пользователя" />
                                </label>
                                
                                    <label class="label"><span>Email</span>
                                        <input type="email" class="input" value="test@example.com" placeholder="Email" />
                                    </label>
                    
                                <label class="label">{/*<span>Пароль</span>*/}
                                    <input type="password" class="input" value="123456789" placeholder="Пароль" />
                                </label>
                                
                                <label class="label">{/*<span>Подтвердите пароль</span> */}
                                    <input type="password" class="input" value="123456789" placeholder="Подтвердите пароль" />
                                </label>
                                <div class="select">
                                <select class="select-positions">
                                    <option value="DRIVER" >DRIVER</option>
                                </select>
                                </div>
                                <button class="button">Click button</button>
                                <div class="confirmation">
                                    <input type="checkbox" defaultChecked value="Ok" class="checkbox" />
                                    <a class="text-center">I agree</a>
                                </div>                        
                            </fieldset>
                    
                    </div>
                </div>
            </html>
            `,
            {
                url: 'https://127.0.0.1:8000/register/', // по умолчанию about:blank
                referrer: 'https://127.0.0.1:8000/registe/',
                contentType: 'text/html', // значения по умолчанию
                includeNodeLocations: true,
            },
        ).window;
        documents = document;
        window.location.pathname = '/register/';
    });
    afterEach(() => {
        documents.close();
    });
    test('Test of event to the handler', async () => {
        const rootHtml = documents.getElementById('root');
        const buttonHtml = rootHtml?.getElementsByClassName('button')[0] as HTMLButtonElement;
        // check - What we don't have the null or undefined
        expect(buttonHtml).not.toBeFalsy();
        // Check - Location element in the body of the document, or not.
        expect(buttonHtml).toBeInTheDocument();
        // Create event of the mouse-click by buttom
        const clickEvent = {
            preventDefault: jest.fn(),
            stoppropagation: jest.fn(),
            target: {
                ...buttonHtml,
                tagName: 'BUTTON',
                parentElement: {
                    parentElement: rootHtml,
                },
            },
        } as unknown as React.MouseEvent<Element, MouseEvent>;
        // Start the handler
        const response = await handlerFormReger(clickEvent);
        // Check response from the handler
        expect(response).not.toBeFalsy();
        expect(typeof response).toBe('object');
        expect(
            (
                response as {
                    username: string;
                    email: string;
                    password: string;
                    category: string;
                }
            )['username'],
        ).toBe('username');
        console.log(response);
    });
});
