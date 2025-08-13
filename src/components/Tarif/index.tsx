/**
 * src\components\Tarif\index.tsx
 */
import React from 'react';
import "./style.scss";
type LevelType = {
    "levelTarif": string
    "pxl": number
    "currency": number 
};
export function TarifFC(props: LevelType): React.JSX.Element {
    const {levelTarif} = props;
    return(
        <div className='tarif'>
            <p>{levelTarif}</p>
            <p>{props.pxl} PXL</p>
            <p>{props.currency} ₸</p>
        </div>
    );
}
