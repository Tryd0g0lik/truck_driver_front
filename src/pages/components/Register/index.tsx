/**
 * src\components\Register\index.tsx
 */
import React from "react";
import "./style.scss";
import { NavbarFC } from "src/components/Navbar";
import { FooterFC } from "src/components/Footer";
import warnedMeaasege from "src/service/errorMessageForFields";
import handlerFormReger from "./handlers/handlerForm";
import { PageMeta } from "@interfeces";
import { handlerApiRegisterPOST } from "./handlers/handler_api";
import { BasisData,  HandlerApiProps } from "@interfeces";
import {APIPerson, APP_URL} from "src/interfaces";

export function RegisterFC(props: PageMeta): React.JSX.Element {
    const {page}  = props;
    return (
        <>
        <section onLoad={async () => await warnedMeaasege({"include":0}) } className="profile">
            <NavbarFC/>
            <main className="form">
                
                    <div className="register_form">
                        {/* FORM FOR THE INIT OF REGISTRATION */}
                        <div className="log">
                            <a className="btn btn-ghost text-xl">Metalmage<span>AI</span></a>
                        </div>
                        {!page.pathName.includes("referral")? 
                            <div className="h">
                                <h1>{page.title}</h1>
                            </div> : null
                        }
                        <fieldset onMouseDown={async (event: React.MouseEvent) => {
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
                            const dataForAPI:HandlerApiProps = {
                                "api": {
                                    "url": APP_URL + `${APIPerson.API__POST_REGISTERATION}`,
                                    "method": "POST",
                                    "body": dotaForm,
                                }
                            };
                            
                            try {
                                /** If all is OK we would be data '{"data": 'OK"}' in the response of the API */
                                const responseApi = await handlerApiRegisterPOST(dataForAPI);
                                console.log(responseApi);
                                return true;
                            } catch (error) {
                                console.log("Error => ", error);   
                                return false;
                            };
                            }} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                            <label className="label"><span>Имя пользователя</span>
                                <input type="text" className="input" placeholder="Имя пользователя" />
                            </label>
                            {page.pathName.startsWith("/register/") ?(
                                <label className="label"><span>Email</span>
                                    <input type="email" className="input" placeholder="Email" />
                                </label>): null
                            }

                            <label className="label">{/*<span>Пароль</span>*/}
                                <input type="password" className="input" placeholder="Пароль" />
                            </label>
                            { page.pathName.startsWith("/register/", 0) ? (<>
                                <label className="label">{/*<span>Подтвердите пароль</span> */}
                                    <input type="password" className="input" placeholder="Подтвердите пароль" />
                                </label>
                                <button className="btn btn-neutral mt-4">Отправить</button>
                                <div className="confirmation">
                                    <input type="checkbox" defaultChecked value="Ok" className="checkbox" />
                                    <a className="text-center">Я принимаю условия условия и Политику конфеденциальности</a>
                                </div></>
                            ) : (
                                <button className="btn btn-neutral mt-4">Login</button>
                            )}
                            
                        </fieldset>
                    </div> 
                    {page.pathName.startsWith("/referral/", 0) ? (<>
                        {/* // FORM OF REFERRAL CODE, FROM ONE FIELD THE INPUT */}
                        <div className="register_form referral refer-code">
                            <div className="log">
                                <a className="btn btn-ghost text-xl">Metalmage<span>AI</span></a>
                            </div>
                            <div className="h">
                                <h1>Регистрация</h1>
                            </div>
                            
                            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                                <label className="label">
                                    <input className="input" placeholder="Введите код с email" type="email" wfd-id="id0" />
                                </label>
                                <p>Преоверьте почту - мы отправили вам 6-значный код Введите для подтверждения</p>
                                <p>Не получили код? <a>Отправить повторно</a></p>
                                <button className="btn btn-neutral mt-4">Зарегистрироваться</button>
                            </fieldset>
                        </div>
                    </>) : null}
            </main>
            <FooterFC/>
        </section>

        </>
    );
};
