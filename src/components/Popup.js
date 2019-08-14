import React from 'react'
import Close from './Close';
import RedirectBtn from './RedirectBtn';

const Popup = (props) => {
    const { text, close, redirect } = props

    return (  
        <>
        <section className="popup">
            <div className="popup__wrap">
                {close? 
                <Close click={props.click}/>: null}
                <h3 className="popup__text">{text}</h3>
                {redirect? 
                <RedirectBtn/> : null}
            </div>
        </section>
        </>
    )
}

 
export default Popup;