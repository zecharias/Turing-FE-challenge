import React from 'react';
import close from '../img/close-big-red.png';

const Close = (props) => {
    return (  
        <>
        <figure onClick={props.click} className="loginPanel__close">
            <img src={close} alt="close" className="loginPanel__close--img"/>
        </figure>
        </>
    );
}
 
export default Close;