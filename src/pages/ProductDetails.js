import React from 'react';
import Details from '../components/Details';
import Icon from '../img/symbol-defs.svg';
import Attributes from '../components/Attributes';
import Reviews from '../components/Reviews';
import UserReview from '../components/UserReview';
import ArrowBack from '../components/ArrowBack';

const ProductDetails = (props) => {
    const url = 'https://backendapi.turing.com/';
    //Product Details page cut into few compoenents
    return ( 
        <>
        <section className="details">
            <ArrowBack/>
            <Details 
            icon={Icon}
            url={`${url}images/products/`} 
            id={ props.match.params.id}
            />
            <section className="attributes">
                <h3 className="attributes__head">Colors & Sizes</h3>
                <Attributes 
                    url={url}
                    id={props.match.params.id}
                    icon={Icon}
                    authToken={props.authToken}
                    cartId={props.cartId}
                />
            </section>

            <section className="reviews">
                <h3 className="reviews__head">Reviews</h3>
                <Reviews
                    url={url}
                    id={props.match.params.id}
                    icon={Icon}
                />
            </section>
            <section className="user-review">
                <UserReview 
                    icon={Icon} 
                    url={url}
                    id={props.match.params.id}
                    authToken={props.authToken}
                    cartId={props.cartId}
                />
            </section>
        </section>
        
        
        </>
    );
}
 
export default ProductDetails;