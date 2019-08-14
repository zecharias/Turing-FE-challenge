import React from 'react';
import { Link } from 'react-router-dom';

const RedirectBtn = () => {
    return (  
        <>
        <Link to='/' exact>
        <button className="product__btn">
            Home
        </button>
        </Link>
        </>
    );
}
 
export default RedirectBtn;