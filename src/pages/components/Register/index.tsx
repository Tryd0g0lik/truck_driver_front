/**
 * src\components\Register\index.tsx
 */
import React, { Suspense } from 'react';
import './style.scss';
import { NavbarFC } from 'src/components/Navbar';
import { FooterFC } from 'src/components/Footer';
import warnedMeaasege from 'src/service/errorMessageForFields';
import { PageMeta, UserStatus } from '@interfeces';
import { mainHandler } from './handlers/handlerMain';

export function RegisterFC(props: PageMeta): React.JSX.Element {
    const { page } = props;
    return (
        <>
            <Suspense
                fallback={
                    <p>
                        <span className="loading loading-spinner text-success"></span>
                    </p>
                }
            >
                <section onLoad={async () => await warnedMeaasege({ include: 0 })} className="profile">
                    <NavbarFC />
                    <main className="form">
                        <div className="register_form">
                            {/* FORM FOR THE INIT OF REGISTRATION */}
                            <div className="log">
                                <a className="btn btn-ghost text-xl">
                                    Truck Driver<span>AI</span>
                                </a>
                            </div>
                            {!page.pathName.includes('referral') ? (
                                <div className="h">
                                    <h1>{page.title}</h1>
                                </div>
                            ) : null}
                            <fieldset
                                onMouseDown={mainHandler}
                                className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
                            >
                                <label className="label">
                                    <span>Имя пользователя</span>
                                    <input type="text" className="input" placeholder="Имя пользователя" />
                                </label>
                                {page.pathName.startsWith('/register/') ? (
                                    <label className="label">
                                        <span>Email</span>
                                        <input type="email" className="input" placeholder="Email" />
                                    </label>
                                ) : null}

                                <label className="label">
                                    {/*<span>Пароль</span>*/}
                                    <input type="password" className="input" placeholder="Пароль" />
                                </label>
                                {page.pathName.startsWith('/register/', 0) ? (
                                    <>
                                        <label className="label">
                                            {/*<span>Подтвердите пароль</span> */}
                                            <input type="password" className="input" placeholder="Подтвердите пароль" />
                                        </label>
                                        <div className="select">
                                            <select defaultValue="Pick a color" className="select-positions">
                                                <option disabled={true}>Position</option>
                                                <option>{UserStatus.CATEGORY_DRIVER}</option>
                                                <option>{UserStatus.CATEGORY_BASE}</option>
                                                <option>{UserStatus.CATEGORY_MANAGER}</option>
                                                <option>{UserStatus.CATEGORY_CLIENT}</option>
                                                <option>{UserStatus.CATEGORY_ADMIN}</option>
                                            </select>
                                        </div>
                                        <button className="btn btn-neutral mt-4">Send</button>
                                        <div className="confirmation">
                                            <input type="checkbox" defaultChecked value="Ok" className="checkbox" />
                                            <a className="text-center">I agree</a>
                                        </div>
                                    </>
                                ) : (
                                    <button className="btn btn-neutral mt-4">Login</button>
                                )}
                            </fieldset>
                        </div>
                        {page.pathName.startsWith('/referral/', 0) ? (
                            <>
                                {/* // FORM OF REFERRAL CODE, FROM ONE FIELD THE INPUT */}
                                <div className="register_form referral refer-code">
                                    <div className="log">
                                        <a href="/" className="btn btn-ghost text-xl">
                                            Truck Driver<span>AI</span>
                                        </a>
                                    </div>
                                    <div className="h">
                                        <h1>Registration</h1>
                                    </div>

                                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                                        <label className="label">
                                            <input
                                                className="input"
                                                placeholder="Введите код с email"
                                                type="email"
                                                wfd-id="id0"
                                            />
                                        </label>
                                        <p>Check your email - we sent letter. It contain the secret code</p>
                                        <p>
                                            No code? <a>Send more?</a>
                                        </p>
                                        <button className="btn btn-neutral mt-4">Registration</button>
                                    </fieldset>
                                </div>
                            </>
                        ) : null}
                    </main>
                    <FooterFC />
                </section>
            </Suspense>
        </>
    );
}
