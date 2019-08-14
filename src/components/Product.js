import React from 'react';
import { NavLink } from 'react-router-dom';

const Product = (props) => {

    //Product component which has two sides, and controling roatation by scss file products.scss
    const url='https://backendapi.turing.com/';
    const { data } = props
    return ( 
        <>
        <div className="product">
        <div className="product__side product__side--front">
                <figure className="product__img-wrap">
                    <img 
                        src={`${url}images/products/${data.thumbnail}`} 
                        alt="T-shirt" 
                        className="product__img"
                    />
                </figure>
                <h4 className="product__head">{data.name}</h4>

                <NavLink to={`/details/${data.product_id}`}>
                    <button className="product__btn">
                            See More &rarr;
                    </button>
                </NavLink>
        </div>
        <div className="product__side product__side--back">
            <h4 className="product__head product__head--back">{data.name}</h4>
            <p className="product__description">
                {data.description}
            </p>
            <div className="product__price-wrap">
                Price:
                {data.discounted_price==='0.00'? 
                <span className='product__price'>{data.price}$</span> : 
                <><span className='product__price product__price--lt'>{data.price}$</span>
                <span className='product__price product__price--dis'>{data.discounted_price}$</span></>}
            </div>
            <NavLink to={`/details/${data.product_id}`}>
                <button className="product__btn">
                        See More &rarr;
                </button>
            </NavLink>
        </div> 
        </div>
        </>
    );
}
 
export default Product;