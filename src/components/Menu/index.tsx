/**
 * src\components\Menu\index.tsx
 */
import React from "react";

export function MenuFC(): React.JSX.Element {
    return (
        <>
            
            <div className="navbar-center">
                <div className="log">
                    <a className="btn btn-ghost text-xl">Metalmage<span>AI</span></a>
                </div>
                <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                </div>
                <ul tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><a>О нас</a></li>
                    <li><a>All Generator</a></li>
                    <li><a>FAQ</a></li>
                    <li><a>Тариф</a></li>
                    <li><a>Поддержка</a></li>
                </ul>
                </div>
            </div>
                <div className="navbar-center__menu hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>О нас</a></li>
                        <li><a>All Generator</a></li>
                        <li><a>FAQ</a></li>
                        <li><a>Тариф</a></li>
                        <li><a>Поддержка</a></li>

                    </ul>
                </div>
            </div>
        </>
    );
}
