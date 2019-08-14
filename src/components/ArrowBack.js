import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../img/symbol-defs.svg';

const ArrowBack = () => {
    return ( 
        <NavLink to='/'>
            <div className="details__btn-wrap">
                <button className="details__btn">
                    <svg className="details__svg">
                        <use href={Icon + '#icon-circle-left'} />
                    </svg>
                </button>
            </div>
        </NavLink>
     );
}
 
export default ArrowBack;