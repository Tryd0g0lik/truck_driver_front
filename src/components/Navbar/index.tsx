/**
 * src\components\Navbar\index.tsx
 */
import React from "react";
import "./style.scss";
import { MenuFC } from "../Menu";

export function NavbarFC(): React.JSX.Element{
return (<>
<header className="navbar bg-base-100 shadow-sm">
    <MenuFC />
    <div className="navbar-end">
        <div className="login btn-group">
            <a className="btn">Войти</a>
        </div>
        <div className="register btn-group">
            <a className="btn">Создать аккаунт</a>
        </div>
    </div>

</header>

</>);
};
