/**
 * src\components\Footer\index.tsx
 */
import React from "react";
import "./style.scss";
import { MenuFC } from "../Menu";

export function FooterFC(): React.JSX.Element {
    return(
        <>
        <footer>
            {/* <div> */}
                <MenuFC />
                <div className="footer__submenu">
                    
                    <div className="navbar-right">
                        <div className="navbar-center__menu hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                                <li><a>Политика Cookie</a></li>
                                <li><a>Политика конфеденциальности</a></li>
                                <li><a>Условия и положения</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            {/* </div> */}
            <section className="footer__copiright">
                <div>
                    <div className="footer__copiright__email">
                        <a href="email:support@metalmage.kz">suppert@metalmage.kz</a>
                    </div>
                    <div className="footer__copiright__contact">
                        <p>27, Avenue Road, Brentford, London, Greater London, TW8 9NS</p>
                    </div>
                </div>
                <div>
                    <p className="footer_copiright__text">
                        © 2025 Все права защещины
                    </p></div>
                <div className="footer_services">
                    <a>MetalmageAI</a>
                    <a>txt2voiceAI</a>
                    <a>trnskrptrAI</a>
                </div>
            </section>

        </footer>
        </>
    );
};
