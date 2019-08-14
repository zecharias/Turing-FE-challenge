import React from 'react';
import Icon from '../img/symbol-defs.svg';

const Footer = () => {
    return ( 
        <>
        <footer className="footer">
            <div className="footer__wrap">
                <h2 className="footer__head">Contact us!</h2>
                <div className="footer__icons">
                    <div className="footer__icon">
                        <svg className="footer__svg">
                            <use href={Icon+'#icon-phone'}/>
                        </svg>
                        <span className="footer__text">123456789</span>
                    </div>
                    <div className="footer__icon">
                        <svg className="footer__svg">
                            <use href={Icon+ '#icon-facebook2'} />
                        </svg>
                        <span className="footer__text">Shopmate Facebook</span>
                    </div>
                    <div className="footer__icon">
                        <svg className="footer__svg">
                            <use href={Icon+'#icon-pinterest'} />
                        </svg>
                        <span className="footer__text">Shopmate Pinterest</span>
                    </div>
                    <div className="footer__icon">
                        <svg className="footer__svg">
                            <use href={Icon+'#icon-envelop'} />
                        </svg>
                        <span className="footer__text">example@mail.com</span>
                    </div>
                </div>
            </div>
        </footer>
        </>
    );
}
 
export default Footer;