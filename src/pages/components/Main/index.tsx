/**
 * src\pages\components\Pay\index.tsx
 */
import React from "react";

import { NavbarFC } from "src/components/Navbar";
import { FooterFC } from "src/components/Footer";

export function MainFC(): React.JSX.Element {
    return(
    <section className="pay">
        <NavbarFC/>
        <section className="form">
            
        </section>
        <FooterFC/>
    </section>
    );
}
