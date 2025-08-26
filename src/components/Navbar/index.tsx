/**
 * src\components\Navbar\index.tsx
 */
import React, { useEffect, useState } from "react";
import "./style.scss";
import { MenuFC } from "../Menu";
import { getCookie } from "src/service/cookiesService";

export function NavbarFC(): React.JSX.Element{
    const [personstate, setPersonstate] = useState<boolean>(false);
    useEffect(() => {
        getCookie("person")? setPersonstate(true) : setPersonstate(false);  
    });
return (<>
<header className="navbar bg-base-100 shadow-sm">
    <MenuFC />
    <div className="navbar-end">
        { !personstate ? (
            <>
            <div className="login btn-group">
                <a className="btn" href="/login/">Login</a>
            </div>
            <div className="register btn-group">
                <a href="/register/" className="btn">Create profile</a>
            </div>
            </>
        ) : (
            <div className="login btn-group">
                <a className="btn">Logout</a>
            </div>
        ) }
        
    </div>

</header>

</>);
};
