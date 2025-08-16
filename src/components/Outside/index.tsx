/**
 * src\components\Outside\index.tsx
 */
import React from "react";
import 'react-datepicker/dist/react-datepicker.css';
interface OutsideFCProps<TProps> {
  Component: React.ComponentType<TProps>
  props?: TProps
}

/**
 * OutsideFC is component is a wrapper for other components
 * @param param0 contain the child component and props for child component
 * @returns 
 */
export function  OutsideFC<TProps>({ Component, props }: OutsideFCProps<TProps>):React.JSX.Element {
    // @ts-ignore
    const comp = <Component {...props} />;
    return (<section className="side">
            {comp}
        </section>
    );
}
